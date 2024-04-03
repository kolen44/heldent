import { Controller, Get } from '@nestjs/common';
import { GratesService } from './grates.service';

@Controller('grates')
export class GratesController {
	constructor(private readonly gratesService: GratesService) {}

	@Get()
	findOne() {
		return this.gratesService.findOne();
	}
}
