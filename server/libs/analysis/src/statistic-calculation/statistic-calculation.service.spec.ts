import { Test, TestingModule } from '@nestjs/testing';
import { StatisticCalculationService } from './statistic-calculation.service';

describe('StatisticCalculationService', () => {
	let service: StatisticCalculationService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [StatisticCalculationService],
		}).compile();

		service = module.get<StatisticCalculationService>(
			StatisticCalculationService,
		);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	describe('corelation', () => {
		it('test corelation', () => {
			const data = [
				[1, 2, 3, 4, 6],
				[60, 65, 70, 75, 85],
			] as [number[], number[]];
			expect(service.corelation(...data)).toBe(1);
		});

		it('test warning', () => {
			const data1 = [
				[0, 1, 2, 3, 4, 5],
				[60, 65, 70, 75, 80],
			] as [number[], number[]];

			expect(service.corelation(...data1)).toBe(1);

			const data2 = [
				[1, 2, 3, 4, 5],
				[0, 60, 65, 70, 75, 80],
			] as [number[], number[]];

			expect(service.corelation(...data2)).toBe(1);
		});

		it('test length', () => {
			const data1 = [[], [60, 65, 70, 75, 80]] as [number[], number[]];

			expect(() => service.corelation(...data1)).toThrow(
				'Data has been Array',
			);

			const data2 = [[1, 2, 3, 4, 5], []] as [number[], number[]];

			expect(() => service.corelation(...data2)).toThrow(
				'Data has been Array',
			);
		});
	});

	describe('median', () => {
		it('test midian', () => {
			const data = [4, 6, 8, 2, 10000];
			expect(service.midian(data)).toBe(8);
		});

		it('test midian', () => {
			const data = [4, 6, 8, 16, 2, 10000];
			expect(service.midian(data)).toBe(12);
		});

		it('test fractions', () => {
			const data = [4, 6, 8.1432423, 16.3234234, 2, 10000];
			expect(service.midian(data)).toBe(12.23333285);
		});

		it('test length', () => {
			const data = [];
			expect(() => service.midian(data)).toThrow('Data has been Array');
		});
	});

	describe('standardDeviation', () => {
		it('test standardDeviation', () => {
			const data = [2, 4, 6, 8];
			expect(service.standardDeviation(data)).toBeDefined();
		});

		it('test length', () => {
			const data = [];
			expect(() => service.standardDeviation(data)).toThrow(
				'Data has been Array',
			);
		});
	});
});
