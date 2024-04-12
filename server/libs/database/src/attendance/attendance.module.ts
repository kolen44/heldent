import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attendance } from 'database/entities/attendance.entity';
import { AttendanceService } from './attendance.service';

@Module({
	imports: [TypeOrmModule.forFeature([Attendance])],
	providers: [AttendanceService],
	exports: [AttendanceService],
})
export class AttendanceModule {}
