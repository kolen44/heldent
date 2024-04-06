import { Injectable } from '@nestjs/common';
import { Student } from './entities/student.entity';
import { StudentClassConfig } from './types/config.type';
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
	private getMeanAttendanceInMonth(attendance: Subject['attendance']) {
		let lastDate = new Date(attendance[attendance.length - 1].date);
		return attendance
			.reduce(
				(acc, val) => {
					const date = new Date(val.date);

					if (
						date.getMonth() !== lastDate.getMonth() ||
						!acc.length
					) {
						lastDate = date;
						acc.push({
							date: date,
							attendance: [this.stableAttendance(val.attendance)],
						});
					} else {
						acc[acc.length - 1].attendance.push(
							this.stableAttendance(val.attendance),
						);
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
		const attendanceMean = this.getMeanAttendanceInMonth(
			subject.attendance,
		);
		let lastIndex = 0;

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

	private formatSubject(subject: Pick<Subject, 'grades' | 'attendance'>) {
		const depth = 5;

		const performance = this.getPerformance(subject);

		const meanSubjectPerformance =
			performance.reduce((acc, { performance }) => acc + performance, 0) /
			performance.length;
		const subjectPerformanceIndex = meanSubjectPerformance / 50 - 1;
		const subjectPerformanceIndexRounded =
			Math.round(subjectPerformanceIndex * 10 ** depth) / 10 ** depth;

		return {
			performance,
			performanceIndex: subjectPerformanceIndexRounded,
		};
	}

	public formatOne(student: Student) {
		const subjectsData = student.getSubjectsData();
		const subjects = subjectsData.reduce(
			(subjects, { name, grades, attendance }) => {
				subjects[name] = {
					name,
					grades,
					attendance,
					...this.formatSubject({ grades, attendance }),
				};
				return subjects;
			},
			{} as Record<
				string,
				Subject & {
					name: string;
					performance: {
						date: Date;
						performance: number;
					}[];
					performanceIndex: number;
				}
			>,
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
