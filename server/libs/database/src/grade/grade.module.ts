import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Grade } from 'database/entities/grade.entity';
import { GradeService } from './grade.service';

@Module({
	imports: [TypeOrmModule.forFeature([Grade])],
	providers: [GradeService],
	exports: [GradeService],
})
export class GradeModule {}
