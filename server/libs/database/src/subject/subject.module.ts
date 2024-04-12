import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subject } from 'database/entities/subject.entity';
import { SubjectService } from './subject.service';

@Module({
	imports: [TypeOrmModule.forFeature([Subject])],
	providers: [SubjectService],
	exports: [SubjectService],
})
export class SubjectModule {}
