import { Student as StudentDB } from 'database/entities/student.entity';
import { Student as StudentType } from '../types/student.type';

export class Student {
	constructor(public readonly student: StudentDB | StudentType) {
		if (
			this.student instanceof StudentDB &&
			!this.student.subjects &&
			!this.student.grades &&
			!this.student.attendances
		)
			throw new Error('Subject, grades and attendances is required');
	}

	public getName() {
		if (this.student instanceof StudentDB) {
			return this.student.email;
		}

		return this.student.name;
	}

	public getSubjectsData() {
		if (this.student instanceof StudentDB) {
			const student = this.student.subjects.map((subject) => ({
				email: subject.email,
				grades: subject.grades.map((grade) => ({
					date: grade.date,
					grade: grade.grade * 10,
				})),
				attendances: subject.attendances.map((attendance) => ({
					date: attendance.date,
					attendance: attendance.attendance ? 100 : 0,
				})),
			}));

			return student;
		}

		return Object.entries(this.student.subjects).map(([, subject]) => ({
			name: subject.name,
			grades: subject.grades,
			attendances: subject.attendances,
		}));
	}
}
