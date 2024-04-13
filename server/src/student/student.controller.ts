import { Body, Controller, Post } from '@nestjs/common';
import { AskAssistantDto } from './dto/ask-assistant.dto';
import { CalendarStudentDto } from './dto/calendar-student.dto';
import { StudentService } from './student.service';

@Controller('student')
export class StudentController {
	constructor(private readonly studentService: StudentService) {}

	@Post('assistant')
	// @UseGuards(StudentGuard)
	public async askAssistant(@Body() question: AskAssistantDto) {
		return this.studentService.askAssistant(question);
	}

	@Post('calendar')
	// @UseGuards(StudentGuard)
	createCalendar(@Body() data: CalendarStudentDto) {
		return this.studentService.createCalendar(data);
	}
}
