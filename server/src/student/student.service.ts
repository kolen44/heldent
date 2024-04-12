import { GenerateTextDto } from '@ai-chat/ai-chat/dto/generate-text.dto';
import { Chat } from '@ai-chat/ai-chat/entities/chat/chat.entity';
import { YandexChatRole } from '@ai-chat/ai-chat/types/yandex.type';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Attendance } from 'database/entities/attendance.entity';
import { Grade } from 'database/entities/grade.entity';
import { Student } from 'database/entities/student.entity';
import { Subject } from 'database/entities/subject.entity';
import { readFileSync } from 'fs';
import { Repository } from 'typeorm';
import { AiChatService } from '../../libs/ai-chat/src/ai-chat.service';
import { AddSubjectDto } from './dto/add-subject.dto';
import { AskAssistantDto } from './dto/ask-assistant.dto';
import { UpdateSubjectDto } from './dto/update-subjects.dto';

@Injectable()
export class StudentService {
	constructor(
		@InjectRepository(Student)
		private readonly studentRepository: Repository<Student>,

		@InjectRepository(Subject)
		private readonly subjectRepository: Repository<Subject>,

		@InjectRepository(Grade)
		private readonly gradeRepository: Repository<Grade>,

		@InjectRepository(Attendance)
		private readonly attendanceRepository: Repository<Attendance>,

		private aiChatService: AiChatService,
	) {}

	// Получение аккаунта студента
	public async getAccount(student: Student) {
		const fullStudent = await this.studentRepository.findOne({
			where: { id: student.id },
			relations: ['subjects.grades', 'subjects.attendances'],
		});

		return this.formatStudent(fullStudent);
	}

	// Добавление предмета к студенту
	public async addSubject(addSubjectDto: AddSubjectDto, student: Student) {
		const { subjectId } = addSubjectDto;

		const studentWithSubjects = await this.studentRepository.findOne({
			where: { id: student.id },
			relations: ['subjects'],
		});

		const subject = await this.subjectRepository.findOne({
			where: { id: subjectId },
		});

		if (!subject) throw new BadRequestException('Subject not found');

		const subjectLength = studentWithSubjects.subjects?.length;
		const hasSubjectInStudent = studentWithSubjects.subjects.find(
			(item) => item.id === subject.id,
		);

		if (subjectLength && hasSubjectInStudent)
			throw new BadRequestException('Subject already added');

		if (subjectLength && !hasSubjectInStudent) {
			studentWithSubjects.subjects.push(subject);
		} else {
			studentWithSubjects.subjects = [subject];
		}

		await this.studentRepository.save(studentWithSubjects);

		return subject; // this.formatStudent(studentWithSubjects);
	}

	// Удаление предмета у студента
	public async deleteSubject(subjectId: number, student: Student) {
		const studentWithSubjects = await this.studentRepository.findOne({
			where: { id: student.id },
			relations: ['subjects'],
		});

		const subject = await this.subjectRepository.findOne({
			where: { id: subjectId },
			relations: ['grades.student', 'attendances.student'],
		});

		const hasSubjectInStudent = studentWithSubjects.subjects.find(
			(studentSubject) => studentSubject.id === subject.id,
		);

		if (!hasSubjectInStudent)
			throw new BadRequestException('Subject not found');

		console.log(subject);
		const gradesForRemove = subject.grades?.filter(
			(grade) => grade.student.id === student.id,
		);

		const attendancesForRemove = subject.attendances?.filter(
			(attendance) => attendance.student.id === student.id,
		);

		if (subject.grades && subject.grades.length)
			await this.gradeRepository.remove(gradesForRemove);

		if (subject.attendances && subject.attendances.length)
			await this.attendanceRepository.remove(attendancesForRemove);

		studentWithSubjects.subjects = studentWithSubjects.subjects.filter(
			(studentSubject) => studentSubject.id !== subject.id,
		);

		await this.studentRepository.save(studentWithSubjects);

		return this.formatSubject(subject); // this.formatStudent(studentWithSubjects);
	}

	// Добавление оценок/посещаемости к предмету
	public async updateSubjects(
		subjectId: number,
		updateSubjectsDto: UpdateSubjectDto,
		student: Student,
	) {
		// Поиск студента, а в нём нужный нам предмет
		const studentWithSubjects = await this.studentRepository.findOne({
			where: { id: student.id },
			relations: ['subjects.grades', 'subjects.attendances'],
		});

		const subject = studentWithSubjects.subjects.find(
			(subject) => subject.id === subjectId,
		);

		if (!subject)
			throw new BadRequestException(
				'Subject not found in student subjects',
			);

		const { grades, attendances } = updateSubjectsDto;

		// Добавление Оценок
		if (grades?.length) {
			const newGrades = this.gradeRepository.create(
				grades.map(({ date, grade }) => ({
					grade,
					date: new Date(date),
					student: studentWithSubjects,
					subject: subject,
				})),
			);

			await this.gradeRepository.save(newGrades);
			subject.grades = subject.grades.concat(newGrades);
		}

		// Добавление Посещаемости
		if (attendances?.length) {
			const newAttendance = this.attendanceRepository.create(
				attendances.map(({ date, attendance }) => ({
					attendance,
					date: new Date(date),
					student: studentWithSubjects,
					subject: subject,
				})),
			);

			await this.attendanceRepository.save(newAttendance);
			subject.attendances = subject.attendances.concat(newAttendance);
		}

		await this.studentRepository.save(studentWithSubjects);

		// Возвращаем студента с обновленными данными
		return this.formatSubject(subject); // this.formatStudent(studentWithSubjects);
	}

	public async askAssistant(askAssistantDto: AskAssistantDto) {
		const dataAboutUniversity = readFileSync(
			'../data-about-university.txt',
			'utf8',
		);

		const chat = new Chat([
			{
				role: YandexChatRole.SYSTEM,
				text: 'Вот данные для контекста:' + '\n' + dataAboutUniversity,
			},
			{
				role: YandexChatRole.SYSTEM,
				text: 'Ты ассистент для вуза, отвечай студентам на их вопросы, основываясь на данных о вузе, отвечай в разговорной форме, как будто ты на одной волне со студентами. Отвечай так, будто ты представляешь этот вуз. Не забывай о том, что тебя могут спрашивать первокурсники, говори всё доходчиво, что бы каждый тебя понял. Если есть возможность рассказать про какой-нибудь мастер-класс или курс, обязательно скажи про него, если это уместно.',
			},
			{
				role: YandexChatRole.USER,
				text: askAssistantDto.question,
			},
		]);

		await this.aiChatService.generate(new GenerateTextDto(chat));

		// console.log(chat);

		return chat.getLastMessage();
	}

	// TODO можно куда то вынести, к примеру сервис formatStudent или типо того
	private formatStudent(student: Student) {
		return {
			...student,
			subjects: student.subjects?.map((subject) =>
				this.formatSubject(subject),
			),
			password: undefined,
		};
	}

	// TODO и этот тоже вместе с formatStudent
	private formatSubject(subject: Subject) {
		return {
			...subject,
			grades: subject.grades?.map(({ id, date, grade }) => ({
				id,
				date,
				grade,
			})),
			attendances: subject.attendances?.map(
				({ id, date, attendance }) => ({ id, date, attendance }),
			),
		};
	}
}
