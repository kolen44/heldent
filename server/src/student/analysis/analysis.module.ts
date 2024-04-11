import { StudentModule } from '@analysis/analysis/educational-metrics/student/student.module';
import { GraphPredictModule } from '@analysis/analysis/graph-predict/graph-predict.module';
import { TokenModule } from '@app/token';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from 'database/entities/student.entity';
import { AnalysisController } from './analysis.controller';
import { AnalysisService } from './analysis.service';

@Module({
	imports: [
		TypeOrmModule.forFeature([Student]),
		TokenModule,
		StudentModule,
		GraphPredictModule,
	],
	controllers: [AnalysisController],
	providers: [AnalysisService],
})
export class AnalysisModule {}
