import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Subject } from 'database/entities/subject.entity';
import { Repository } from 'typeorm';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';

@Injectable()
export class SubjectService {
	constructor(
		@InjectRepository(Subject)
		private readonly subjectRepository: Repository<Subject>,
	) {}

	create(createSubjectDto: CreateSubjectDto) {
		this.subjectRepository.create(createSubjectDto);
	}

	findAll() {
		return `This action returns all subject`;
	}

	findOne(id: number) {
		return `This action returns a #${id} subject`;
	}

	update(id: number, updateSubjectDto: UpdateSubjectDto) {
		return `This action updates a #${id} subject`;
	}

	remove(id: number) {
		return `This action removes a #${id} subject`;
	}
}
