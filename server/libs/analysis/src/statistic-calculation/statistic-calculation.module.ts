import { Module } from '@nestjs/common';
import { StatisticCalculationService } from './statistic-calculation.service';

// TODO удалить entities и dto, если будет не нужны

@Module({
	providers: [StatisticCalculationService],
	exports: [StatisticCalculationService],
})
export class StatisticCalculationModule {}
