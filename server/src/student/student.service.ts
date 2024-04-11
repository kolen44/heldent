import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Attendance } from 'database/entities/attendance.entity';
import { Grade } from 'database/entities/grade.entity';
import { Student } from 'database/entities/student.entity';
import { Subject } from 'database/entities/subject.entity';
import { Repository } from 'typeorm';
import { AddSubjectDto } from './dto/add-subject.dto';
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

		return this.formatStudent(studentWithSubjects);
	}

	// Удаление предмета у студента
	public async deleteSubject(subjectId: number, student: Student) {
		const studentWithSubjects = await this.studentRepository.findOne({
			where: { id: student.id },
			relations: ['subjects'],
		});

		const subject = await this.subjectRepository.findOne({
			where: { id: subjectId },
		});

		const hasSubjectInStudent = studentWithSubjects.subjects.find(
			(studentSubject) => studentSubject.id === subject.id,
		);

		if (!hasSubjectInStudent)
			throw new BadRequestException('Subject not found');

		studentWithSubjects.subjects = studentWithSubjects.subjects.filter(
			(studentSubject) => studentSubject.id !== subject.id,
		);

		await this.studentRepository.save(studentWithSubjects);

		return this.formatStudent(studentWithSubjects);
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

		const { grades, attendance } = updateSubjectsDto;

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
		if (attendance?.length) {
			const newAttendance = this.attendanceRepository.create(
				attendance.map(({ date, attendance }) => ({
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
		return this.formatStudent(studentWithSubjects);
	}

	// TODO можно куда то вынести, к примеру сервис formatStudent или типо того
	private formatStudent(student: Student) {
		return {
			...student,
			subjects: student.subjects?.map((subject) => ({
				...subject,
				grades: subject.grades?.map(({ id, date, grade }) => ({
					id,
					date,
					grade,
				})),
				attendances: subject.attendances?.map(
					({ id, date, attendance }) => ({
						id,
						date,
						attendance,
					}),
				),
			})),
			password: undefined,
		};
	}
}
