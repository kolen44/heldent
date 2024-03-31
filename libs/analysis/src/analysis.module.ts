import { Module } from '@nestjs/common';
import { AnalysisService } from './analysis.service';
import { GraphPredictModule } from './graph-predict/graph-predict.module';

@Module({
	providers: [AnalysisService],
	exports: [AnalysisService],
	imports: [GraphPredictModule],
})
export class AnalysisModule {}
