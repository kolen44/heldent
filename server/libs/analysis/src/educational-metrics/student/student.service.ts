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
		attendances: Subject['attendances'],
	): Subject['attendances'] {
		let lastDate = new Date(attendances[attendances.length - 1].date);

		const getNewMonthObject = (date: Date, stableAttendance: number) => ({
			date,
			attendances: [stableAttendance],
		});

		const isMonthEqualToLastDate = (date: Date) =>
			date.getMonth() === lastDate.getMonth();

		const attendancesSortedByMonth: {
			date: Date;
			attendances: number[];
		}[] = [];

		for (let i = 0; i < attendances.length; i++) {
			const val = attendances[i];
			const date = new Date(val.date);
			const stableAttendance = this.stableAttendance(+val.attendance);

			// REVIEW START
			if (
				!isMonthEqualToLastDate(date) ||
				!attendancesSortedByMonth.length
			) {
				lastDate = date;
				attendancesSortedByMonth.push(
					getNewMonthObject(date, stableAttendance),
				);
			} else {
				attendancesSortedByMonth[
					attendancesSortedByMonth.length - 1
				].attendances.push(stableAttendance);
			}
			// REVIEW END
		}

		console.log(attendancesSortedByMonth);

		const calculateAverage = (item: number[]) =>
			Math.round(item.reduce((acc, val) => acc + val, 0) / item.length);

		return attendancesSortedByMonth.map(({ date, attendances }) => ({
			date,
			attendance: calculateAverage(attendances),
		}));
	}

	// Функция высчитывает успеваемость по предмету
	private calculatePerformances(
		subject: Pick<Subject, 'grades' | 'attendances'>,
	) {
		const { grades, attendances } = subject;
		const processedPerformances: { date: Date; performance: number }[] = [];
		let monthIndex = 0;

		const meanAttendanceInMonth =
			this.getMeanAttendanceInMonth(attendances);

		const isNextMonth = (currentDate: Date, targetDate: Date) =>
			currentDate.getTime() + oneMonth < targetDate.getTime();

		grades.forEach((grade) => {
			const attendanceItem = meanAttendanceInMonth[monthIndex];

			console.log(attendanceItem);

			if (isNextMonth(attendanceItem.date, grade.date)) {
				monthIndex++;
			}

			const performance = this.calculatePerformanceWithStability(
				grade.grade,
				attendanceItem.attendance,
			);

			processedPerformances.push({ date: grade.date, performance });
		});

		return processedPerformances;
	}

	// Функция высчитывает успеваемость по предмету в одним числом в диапазоне от -1 до 1
	private calculatePerformanceIndex(
		performances: { performance: number }[],
	): number {
		const roundByDecimal = (decimalPlaces: number, numberToRound: number) =>
			Math.round(decimalPlaces * 10 ** numberToRound) /
			10 ** numberToRound;

		const averagePerformance =
			performances.reduce((sum, val) => sum + val.performance, 0) /
			performances.length;

		// Диапазон от -1 до 1
		return roundByDecimal((averagePerformance - 50) / 50, 5);
	}

	public formatOne(student: Student) {
		const processedSubjects: Record<string, CompletedSubject> = {};

		const subjectsData = student.getSubjectsData();

		subjectsData.forEach((subject) => {
			const processedPerformance = this.calculatePerformances(subject);
			const processedPerformanceIndex =
				this.calculatePerformanceIndex(processedPerformance);

			processedSubjects[subject.name] = {
				...subject,
				performance: processedPerformance,
				performanceIndex: processedPerformanceIndex,
			};
		});

		const subjectsSortedByPerformance = Object.values(processedSubjects)
			.map(({ name, performanceIndex }) => ({ name, performanceIndex }))
			.sort((a, b) => b.performanceIndex - a.performanceIndex);

		return { subjects: processedSubjects, subjectsSortedByPerformance };
	}

	public formatMany(students: Student[]) {
		return students.map((student) => this.formatOne(student));
	}
}
