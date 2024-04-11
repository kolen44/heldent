import { Student as StudentClass } from '@analysis/analysis/educational-metrics/student/entities/student.entity';
import { StudentService as EducationStudentService } from '@analysis/analysis/educational-metrics/student/student.service';
import { CompletedSubject } from '@analysis/analysis/educational-metrics/student/types/format-subject.type';
import { GraphPredictDto } from '@analysis/analysis/graph-predict/dto/graph-predict.dto';
import { Graph } from '@analysis/analysis/graph-predict/entities/graph.entity';
import { GraphPredictService } from '@analysis/analysis/graph-predict/graph-predict.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from 'database/entities/student.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AnalysisService {
	constructor(
		@InjectRepository(Student)
		private readonly studentRepository: Repository<Student>,
		private readonly educationStudentService: EducationStudentService,
		private readonly graphPredictService: GraphPredictService,
	) {}

	// Оценка обучения студента
	private getEducationResult(student: Student) {
		const studentDataForFormat = new StudentClass(student);
		return this.educationStudentService.formatOne(studentDataForFormat);
	}

	// Предсказание успеваемости
	private predictPerformance(
		studentPerformance: Record<string, CompletedSubject>,
	) {
		return Object.entries(studentPerformance).map(([name, subject]) => {
			const dataForGraph = subject.performance.map(
				({ performance }) => performance,
			);

			if (dataForGraph.length < 100) {
				return {
					name,
					error: 'Not enough data for prediction',
				};
			}

			const graph = new Graph(dataForGraph);

			const graphPredictDto = new GraphPredictDto({
				predictionCount: 70,
				graph,
			});

			const predict = this.graphPredictService.predict(graphPredictDto);

			return { name, predict };
		});
	}

	public async getAnalysis(student: Student) {
		const studentWithSubjects = await this.studentRepository.findOne({
			where: { id: student.id },
			relations: ['subjects.grades', 'subjects.attendances'],
		});

		const educationResult = this.getEducationResult(studentWithSubjects);
		const predictPerformance = this.predictPerformance(
			educationResult.subjects,
		);

		return { educationResult, predictPerformance };
	}
}
