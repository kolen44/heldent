import { Student as StudentDB } from 'database/entities/student.entity';
import { Student as StudentType } from '../types/student.type';
import { Subject } from '../types/subject.type';

export class Student {
	constructor(public readonly student: StudentDB | StudentType) {
		if (
			this.student instanceof StudentDB &&
			!this.student.subjects &&
			!this.student.grades &&
			!this.student.attendance
		)
			throw new Error('Subject, grades and attendances is required');
	}

	public getName() {
		if (this.student instanceof StudentDB) {
			return this.student.email;
		}

		return this.student.name;
	}

	public getSubjectsData(): Subject[] {
		if (this.student instanceof StudentDB) {
			const student = this.student.subjects.map((subject) => ({
				name: subject.name,
				grades: subject.grades.map((grade) => ({
					date: grade.date,
					grade: grade.grade * 10,
				})),
				attendance: subject.attendances.map((attendance) => ({
					date: attendance.date,
					attendance: attendance.attendance ? 100 : 0,
				})),
			}));

			console.log(student);

			return student;

			// return this.student.subjects.map((subject) => ({
			// 	name: subject.name,
			// 	grades: subject.grades,
			// 	attendance: subject.attendances,
			// }));
		}

		return Object.entries(this.student.subjects).map(([name, subject]) => ({
			name,
			grades: subject.grades,
			attendance: subject.attendance,
		}));
	}
}
