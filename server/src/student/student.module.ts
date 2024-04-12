import { AiChatModule } from '@ai-chat/ai-chat';
import { TokenModule } from '@app/token';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attendance } from 'database/entities/attendance.entity';
import { Grade } from 'database/entities/grade.entity';
import { Student } from 'database/entities/student.entity';
import { Subject } from 'database/entities/subject.entity';
import { AnalysisModule } from './analysis/analysis.module';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';

@Module({
	imports: [
		TypeOrmModule.forFeature([Student]),
		TypeOrmModule.forFeature([Subject]),
		TypeOrmModule.forFeature([Grade]),
		TypeOrmModule.forFeature([Attendance]),
		TokenModule,
		AnalysisModule,
		AiChatModule,
	],
	controllers: [StudentController],
	providers: [StudentService],
})
export class StudentModule {}
