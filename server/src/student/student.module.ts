import { TokenModule } from '@app/token';
import { Module } from '@nestjs/common';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';

@Module({
	imports: [TokenModule],
	controllers: [StudentController],
	providers: [StudentService],
})
export class StudentModule {}
