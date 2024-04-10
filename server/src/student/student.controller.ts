import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Req,
	UseGuards,
} from '@nestjs/common';
import { UpdateStudentDto } from './dto/update-student.dto';
import { StudentGuard } from './student.guard';
import { StudentService } from './student.service';

@Controller('student')
export class StudentController {
	constructor(private readonly studentService: StudentService) {}

	// @Get()
	// findMany() {
	// 	return this.studentService.findAll();
	// }

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.studentService.findOne(+id);
	}

	@Get()
	@UseGuards(StudentGuard)
	getAccount(@Req() req: Request) {
		// console.log(req);
		// return this.studentService.findOne(+id);
	}

	@Patch(':id')
	update(
		@Param('id') id: string,
		@Body() updateStudentDto: UpdateStudentDto,
	) {
		return this.studentService.update(+id, updateStudentDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.studentService.remove(+id);
	}
}
