import { Student as StudentDB } from 'database/entities/student.entity';
import { Student as StudentType } from '../types/student.type';
import { Subject } from '../types/subject.type';

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

	public getSubjectsData(): Subject[] {
		if (this.student instanceof StudentDB) {
			const subjects = this.student.subjects.map((subject) => ({
				name: subject.email,
				grades: subject.grades.map((grade) => ({
					date: grade.date,
					grade: grade.grade * 10,
				})),
				attendances: subject.attendances.map((attendance) => ({
					date: attendance.date,
					attendance: attendance.attendance ? 100 : 0,
				})),
			}));

			return subjects;
		}

		return Object.entries(this.student.subjects).map(([, subject]) => ({
			name: subject.name,
			grades: subject.grades,
			attendances: subject.attendances,
		}));
	}
}
