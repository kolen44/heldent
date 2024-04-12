import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { StudentModule } from './student/student.module';
import { GradeModule } from './grade/grade.module';
import { AttendanceModule } from './attendance/attendance.module';
import { SubjectModule } from './subject/subject.module';

@Module({
	providers: [DatabaseService],
	exports: [DatabaseService],
	imports: [StudentModule, GradeModule, AttendanceModule, SubjectModule],
})
export class DatabaseModule {}
