import { Module } from '@nestjs/common';
import { AnalysisService } from './analysis.service';
import { GraphPredictModule } from './graph-predict/graph-predict.module';
import { StatisticCalculationModule } from './statistic-calculation/statistic-calculation.module';

@Module({
	providers: [AnalysisService],
	exports: [AnalysisService],
	imports: [GraphPredictModule, StatisticCalculationModule],
})
export class AnalysisModule {}
