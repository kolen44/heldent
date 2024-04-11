import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Student } from 'database/entities/student.entity';
import { StudentGuard } from 'src/auth/guards/student.guard';
import { AnalysisService } from './analysis.service';

@Controller('student/analysis')
export class AnalysisController {
	constructor(private readonly analysisService: AnalysisService) {}

	@Get()
	@UseGuards(StudentGuard)
	public async getAnalysis(@Req() req: Request & { student: Student }) {
		return this.analysisService.getAnalysis(req.student);
	}
}
