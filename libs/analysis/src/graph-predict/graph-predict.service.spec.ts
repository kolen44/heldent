import { Test, TestingModule } from '@nestjs/testing';
import { GraphPredictDto } from './dto/graph-predict.dto';
import { Graph } from './entities/graph.entity';
import { GraphPredictModule } from './graph-predict.module';
import { GraphPredictService } from './graph-predict.service';

describe('GraphPredictService', () => {
	let service: GraphPredictService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [GraphPredictModule],
		}).compile();

		service = module.get<GraphPredictService>(GraphPredictService);
		await service.onModuleInit();
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	it('for test', async () => {
		const graph = new Graph([
			79, 49, 77, 54, 35, 46, 23, 79, 53, 74, 76, 22, 77, 38, 80, 81, 58,
			33, 63, 44, 57, 64, 64, 77, 52, 21, 41, 76, 68, 65, 57, 31, 72, 81,
			69, 58, 40, 40, 67, 63, 67, 76, 50, 72, 84, 30, 82, 62, 71, 74, 37,
			50, 34, 37, 39, 53, 59, 68, 70, 77, 27, 55, 45, 58, 72, 37, 82, 52,
			48, 46, 35, 21, 33, 79, 22, 61, 48, 46, 74, 45, 83, 75, 35, 61, 40,
			31, 84, 50, 65, 34, 40, 42, 61, 35, 55, 49, 80, 47, 50, 35,
		]);
		const graphPredictDto = new GraphPredictDto({
			predictionCount: 200,
			graph,
		});
		const result = service.predict(graphPredictDto);

		expect(result.arrOfNum.length).toBe(300);
	});
});
