import { Test, TestingModule } from '@nestjs/testing';
import { Student } from './entities/student.entity';
import { StudentService } from './student.service';
import { Student as StudentType } from './types/student.type';

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

	it('test StudentService', () => {
		const nowDate = new Date();
		const oneMonth = 1000 * 60 * 60 * 24 * 30;

		const studentData: StudentType = {
			name: 'asdsad',
			subjects: {
				math: {
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
					attendance: [
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

		const student: Student = new Student(studentData);

		expect(service.formatOne(student)).toEqual({
			name: 'asdsad',
			subjects: {
				math: {
					name: 'math',
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
					attendance: [
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
			subjectsSortedByGrade: [
				{
					name: 'math',
					performanceIndex: 0.16667,
				},
			],
		});
	});
});
