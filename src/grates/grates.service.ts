import { Injectable } from '@nestjs/common';
import { CreateGrateDto } from './dto/create-grate.dto';
import { UpdateGrateDto } from './dto/update-grate.dto';

@Injectable()
export class GratesService {
	create(createGrateDto: CreateGrateDto) {
		return 'This action adds a new grate';
	}

	findAll() {
		return `This action returns all grates`;
	}

	findOne(id: number) {
		return `This action returns a #${id} grate`;
	}

	update(id: number, updateGrateDto: UpdateGrateDto) {
		return `This action updates a #${id} grate`;
	}

	remove(id: number) {
		return `This action removes a #${id} grate`;
	}
}
