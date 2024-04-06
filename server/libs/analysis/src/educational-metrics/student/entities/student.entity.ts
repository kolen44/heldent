import { User } from 'database/entities/user.entity';
import { Student as StudentType } from '../types/student.type';

export class Student {
	constructor(private student: User | StudentType) {}

	public getName() {
		if (this.student instanceof User) {
			return this.student.email;
		}

		return this.student.name;
	}

	public getSubjectsData() {
		if (this.student instanceof User) {
			return this.student.subjects.map((subject) => ({
				name: subject.name,
				grades: subject.grades,
				attendance: subject.attendances,
			}));
		}

		return Object.entries(this.student.subjects).map(([name, subject]) => ({
			name,
			grades: subject.grades,
			attendance: subject.attendance,
		}));
	}
}
