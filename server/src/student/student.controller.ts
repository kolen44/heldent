import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Query,
	Req,
	UseGuards,
} from '@nestjs/common';
import { Student } from 'database/entities/student.entity';
import { StudentGuard } from '../auth/guards/student.guard';
import { AddSubjectDto } from './dto/add-subject.dto';
import { AskAssistantDto } from './dto/ask-assistant.dto';
import { UpdateSubjectDto } from './dto/update-subjects.dto';
import { StudentService } from './student.service';

@Controller('student')
export class StudentController {
	constructor(private readonly studentService: StudentService) {}

	@Get()
	@UseGuards(StudentGuard)
	public async getAccount(@Req() req: Request & { student: Student }) {
		return this.studentService.getAccount(req.student);
	}

	// Добавить предмет к студенту
	@Post('subject')
	@UseGuards(StudentGuard)
	public async addSubject(
		@Body() addSubjectDto: AddSubjectDto,
		@Req() req: Request & { student: Student },
	) {
		return this.studentService.addSubject(addSubjectDto, req.student);
	}

	// Удалить предмет у студента
	@Delete('subject/:subjectId')
	@UseGuards(StudentGuard)
	public async deleteSubject(
		@Param('subjectId') subjectId: number,
		@Req() req: Request & { student: Student },
	) {
		return this.studentService.deleteSubject(subjectId, req.student);
	}

	// Добавить оценки/посещаемость студента к предмету
	@Post('subject/:subjectId')
	@UseGuards(StudentGuard)
	public async updateSubjects(
		@Param('subjectId') subjectId: number,
		@Body() updateSubjectDto: UpdateSubjectDto,
		@Req() req: Request & { student: Student },
	) {
		return this.studentService.updateSubjects(
			+subjectId,
			updateSubjectDto,
			req.student,
		);
	}

	@Get('assistant')
	public async askAssistant(
		@Req() req: Request & { student: Student },
		@Query('role') role: string,
		@Body() question: AskAssistantDto,
	) {
		return this.studentService.askAssistant(question, role);
	}
}
