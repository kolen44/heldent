import { Injectable } from '@nestjs/common';
import { Student } from './entities/student.entity';
import { StudentClassConfig } from './types/config.type';
import { CompletedSubject } from './types/format-subject.type';
import { Subject } from './types/subject.type';

const oneDay = 1000 * 60 * 60 * 24;
const oneMonth = oneDay * 30;

@Injectable()
export class StudentService {
	private config: StudentClassConfig;

	constructor() {
		this.config = { grade: { max: 100 }, attendance: { max: 100 } };
	}

	private stableGrade(grade: number) {
		return (grade / this.config.grade.max) * 100;
	}

	private stableAttendance(attendance: number) {
		return (attendance / this.config.attendance.max) * 100;
	}

	private calculatePerformance(grade: number, attendance: number) {
		return Math.round(0.9 * grade + 0.1 * attendance);
	}

	private calculatePerformanceWithStability(
		grade: number,
		attendance: number,
	) {
		return this.calculatePerformance(
			this.stableGrade(grade),
			this.stableAttendance(attendance),
		);
	}

	// Функция создаёт массив, в котором каждое число это средняя посещаемость за месяц
	// То есть за 2 месяца будет массив из двух элементов
	private getMeanAttendanceInMonth(
		attendance: Subject['attendance'],
	): Subject['attendance'] {
		let lastDate = new Date(attendance[attendance.length - 1].date);

		const getStableObject = (date: Date, stableAttendance: number) => ({
			date,
			attendance: [stableAttendance],
		});

		return attendance
			.reduce(
				(acc, val) => {
					const date = new Date(val.date);
					const stableAttendance = this.stableAttendance(
						val.attendance,
					);

					if (
						date.getMonth() !== lastDate.getMonth() ||
						!acc.length
					) {
						lastDate = date;
						acc.push(getStableObject(date, stableAttendance));
					} else {
						acc[acc.length - 1].attendance.push(stableAttendance);
					}

					return acc;
				},
				[] as { date: Date; attendance: number[] }[],
			)
			.map((item) => ({
				...item,
				attendance: Math.round(
					item.attendance.reduce((acc, val) => acc + val, 0) /
						item.attendance.length,
				),
			}));
	}

	// Функция переводит оценки + посещаемость в успеваемость.
	// 1 к 1: оценки к успеваемости, а посещаемость берётся средняя за месяц
	private getPerformance(subject: Pick<Subject, 'grades' | 'attendance'>) {
		let lastIndex = 0;
		const attendanceMean = this.getMeanAttendanceInMonth(
			subject.attendance,
		);

		return subject.grades.map(({ date, grade }) => {
			const attendanceItem = attendanceMean[lastIndex];

			if (attendanceItem.date.getTime() + oneMonth < date.getTime()) {
				lastIndex++;
			}

			const performance = this.calculatePerformanceWithStability(
				grade,
				attendanceItem.attendance,
			);

			return { date, performance };
		});
	}

	// Функция высчитывает успеваемость по предмету в виде массива
	// И вычисляет среднюю успеваемость в виде от -1 до 1
	private formatSubject(subject: Pick<Subject, 'grades' | 'attendance'>) {
		const decimalPlaces = 5; // Количество знаков после запятой
		const roundingFactor = 10 ** decimalPlaces;

		const performance = this.getPerformance(subject);

		const meanSubjectPerformance =
			performance.reduce((acc, { performance }) => acc + performance, 0) /
			performance.length;
		const subjectPerformanceIndex = meanSubjectPerformance / 50 - 1;
		const subjectPerformanceIndexRounded =
			Math.round(subjectPerformanceIndex * roundingFactor) /
			roundingFactor;

		return {
			performance,
			performanceIndex: subjectPerformanceIndexRounded,
		};
	}

	public formatOne(student: Student) {
		const subjectsData = student.getSubjectsData();
		const subjects = subjectsData.reduce(
			(subjects, { email, grades, attendance }) => ({
				...subjects,
				[email]: {
					email,
					grades,
					attendance,
					...this.formatSubject({ grades, attendance }),
				},
			}),
			{} as Record<string, CompletedSubject>,
		);

		const subjectsSortedByGrade = Object.values(subjects)
			.sort((a, b) => b.performanceIndex - a.performanceIndex)
			.map((subject) => ({
				name: subject.name,
				performanceIndex: subject.performanceIndex,
			}));

		return { subjects, subjectsSortedByGrade };
	}

	public formatMany(students: Student[]) {
		return students.map((student) => this.formatOne(student));
	}
}
