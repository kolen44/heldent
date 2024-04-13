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

	private getMessageAboutContext() {
		const dataAboutUniversity = readFileSync(
			'../data-about-university.txt',
			'utf8',
		);

		return {
			role: YandexChatRole.SYSTEM,
			text: 'Вот данные для контекста:' + '\n' + dataAboutUniversity,
		};
	}

	private getAssistantChat(question: string) {
		return new Chat([
			this.getMessageAboutContext(),
			{
				role: YandexChatRole.SYSTEM,
				text: 'Представь себя в роли ассистента для студентов вуза. Говори на одной волне со студентами, будто ты и есть один из них. Отвечай на вопросы студентов, основываясь на информации о вузе. Если есть возможность, расскажи о мастер-классах или курсах, если это уместно.',
			},
			{ role: YandexChatRole.USER, text: question },
		]);
	}

	private getProgrammerChat(question: string) {
		return new Chat([
			this.getMessageAboutContext(),
			{
				role: YandexChatRole.SYSTEM,
				text: 'Привет! Представь себя как опытный программист, готовый помочь студентам в изучении их предмета. Твоя цель - отвечать на вопросы студентов, касающиеся программирования и языка C++, а также предоставлять ресурсы для дальнейшего изучения. Помимо ответов на вопросы, можешь предложить студенту ресурсы для самостоятельного изучения, например, курсы, учебники или онлайн-платформы. При необходимости уточни, есть ли вузовские ресурсы, которые могут быть полезны для студентов. Если вопрос не связан с программированием, можешь предложить студенту обратиться к другому человеку или преподавателю, который сможет ему помочь в этом вопросе. Постарайся использовать точные термины и детально вводить студента в курс дела, чтобы он получил максимально полезную информацию.',
			},
			{ role: YandexChatRole.USER, text: question },
		]);
	}

	private getPsychologistChat(question: string) {
		return new Chat([
			this.getMessageAboutContext(),
			{
				role: YandexChatRole.SYSTEM,
				text: 'Привет! Представь себя как психолог для студентов вуза. Твоя задача — говорить на одной волне со студентами, чтобы они чувствовали себя комфортно. Если вопрос не относится к психологической области, направь студента к другому преподавателю или специалисту. Основывай свои ответы на данных о вузе для более точной помощи студентам. Постарайся быть понятным и поддерживать доверительную атмосферу, чтобы студент мог свободно общаться и получить нужную помощь.',
			},
			{ role: YandexChatRole.USER, text: question },
		]);
	}

	public async askAssistant(askAssistantDto: AskAssistantDto, role: string) {
		let chat: Chat;

		switch (role) {
			case 'assistant' || null:
				chat = this.getAssistantChat(askAssistantDto.question);
				break;

			case 'programmer':
				chat = this.getProgrammerChat(askAssistantDto.question);
				break;

			case 'psychologist':
				chat = this.getPsychologistChat(askAssistantDto.question);
				break;

			default:
				throw new BadRequestException('Unknown role');
		}

		await this.aiChatService.generate(new GenerateTextDto(chat));

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
