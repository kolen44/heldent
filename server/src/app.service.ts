import { Student } from '@analysis/analysis/educational-metrics/student/entities/student.entity';
import { StudentService } from '@analysis/analysis/educational-metrics/student/student.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student as StudentDB } from 'database/entities/student.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
	constructor(
		@InjectRepository(StudentDB) // TODO Удалить
		private userRepository: Repository<StudentDB>, // TODO Удалить
		private studentService: StudentService, // TODO Удалить
	) {}

	async getHello() {
		return 'Hello World!';
	}

	// TODO Удалить
	async getAllSubject() {
		const studentFromDatabase = await this.userRepository.findOne({
			where: { email: 'john@example.com' },
			relations: ['subjects.grades', 'subjects.attendances'],
		});

		if (studentFromDatabase) {
			const student = new Student(studentFromDatabase);
			return {
				...student.student,
				password: undefined,
				...this.studentService.formatOne(student),
			};
		}

		return new NotFoundException('Users not found');
	}
}
