import { Module } from '@nestjs/common';
import { GraphPredictService } from './graph-predict.service';

@Module({
	providers: [GraphPredictService],
	exports: [GraphPredictService],
})
export class GraphPredictModule {}
