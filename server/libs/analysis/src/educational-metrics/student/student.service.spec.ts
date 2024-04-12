import { Test, TestingModule } from '@nestjs/testing';
import { Student } from './entities/student.entity';
import { StudentService } from './student.service';
import { Student as StudentType } from './types/student.type';
import { Subject } from './types/subject.type';

describe('StudentService', () => {
	let service: StudentService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [StudentService],
		}).compile();

		service = module.get<StudentService>(StudentService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	const nowDate = new Date();
	const oneMonth = 1000 * 60 * 60 * 24 * 30;
	const studentData: StudentType = {
		name: 'asdsad',
		subjects: {
			math: {
				name: 'Math',
				grades: [
					{ date: nowDate, grade: 56 },
					{
						date: new Date(nowDate.getTime() + oneMonth),
						grade: 48,
					},
					{
						date: new Date(nowDate.getTime() + oneMonth * 2),
						grade: 58,
					},
				],
				attendances: [
					{ date: nowDate, attendance: 100 },
					{
						date: new Date(nowDate.getTime() + oneMonth),
						attendance: 100,
					},
					{
						date: new Date(nowDate.getTime() + oneMonth * 2),
						attendance: 100,
					},
				],
			},
		},
	};

	it('test StudentService', () => {
		const student: Student = new Student(studentData);

		expect(service.formatOne(student)).toEqual({
			subjects: {
				Math: {
					name: 'Math',
					grades: [
						{ date: nowDate, grade: 56 },
						{
							date: new Date(nowDate.getTime() + oneMonth),
							grade: 48,
						},
						{
							date: new Date(nowDate.getTime() + oneMonth * 2),
							grade: 58,
						},
					],
					attendances: [
						{ date: nowDate, attendance: 100 },
						{
							date: new Date(nowDate.getTime() + oneMonth),
							attendance: 100,
						},
						{
							date: new Date(nowDate.getTime() + oneMonth * 2),
							attendance: 100,
						},
					],

					performance: [
						{
							date: nowDate,
							performance: 60,
						},
						{
							date: new Date(nowDate.getTime() + oneMonth),
							performance: 53,
						},
						{
							date: new Date(nowDate.getTime() + oneMonth * 2),
							performance: 62,
						},
					],
					performanceIndex: 0.16667,
				},
			},
			subjectsSortedByPerformance: [
				{
					name: 'Math',
					performanceIndex: 0.16667,
				},
			],
		});
	});

	it('test StudentService', () => {
		const getLastMonthEndDate = (day: number) => {
			const date = new Date(
				new Date().getFullYear(),
				new Date().getMonth() - 1,
				day,
			);
			date.setUTCHours(0, 0, 0, 0);
			return date;
		};

		const getStudentData = (date: Date): StudentType => ({
			name: 'asdsad',
			subjects: {
				Math: {
					name: 'Math',
					grades: [{ date, grade: 56 }],
					attendances: [{ date, attendance: 100 }],
				},
			},
		});

		const getExpectedResult = (date: Date) => ({
			subjects: {
				Math: {
					name: 'Math',
					grades: [{ date, grade: 56 }],
					attendances: [{ date, attendance: 100 }],

					performance: [{ date, performance: 60 }],
					performanceIndex: 0.2,
				},
			},
			subjectsSortedByPerformance: [
				{ name: 'Math', performanceIndex: 0.2 },
			],
		});

		let lastMonthEndDate = getLastMonthEndDate(2);
		let student: Student = new Student(getStudentData(lastMonthEndDate));
		let expectedResult = getExpectedResult(lastMonthEndDate);

		expect(service.formatOne(student)).toEqual(expectedResult);

		lastMonthEndDate = getLastMonthEndDate(1);
		student = new Student(getStudentData(lastMonthEndDate));
		expectedResult = getExpectedResult(lastMonthEndDate);

		expect(service.formatOne(student)).toEqual(expectedResult);
	});

	it.skip('test', () => {
		const attendances: Subject['attendances'] = [
			{
				date: new Date('2024-01-01'),
				attendance: 100,
			},
			{
				date: new Date('2024-02-01'),
				attendance: 100,
			},
			{
				date: new Date('2024-03-01'),
				attendance: 100,
			},
			{
				date: new Date('2024-03-02'),
				attendance: 100,
			},
			{
				date: new Date('2024-03-03'),
				attendance: 0,
			},
			{
				date: new Date('2024-04-01'),
				attendance: 0,
			},
			{
				date: new Date('2024-04-02'),
				attendance: 0,
			},
		];

		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		expect(service.getMeanAttendanceInMonth(attendances)).toEqual([
			{
				date: new Date('2024-01-01'),
				attendance: 100,
			},
			{
				date: new Date('2024-02-01'),
				attendance: 100,
			},
			{
				date: new Date('2024-03-01'),
				attendance: 67,
			},
			{
				date: new Date('2024-04-01'),
				attendance: 0,
			},
		]);
	});
});
