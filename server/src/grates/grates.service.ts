import { Injectable } from '@nestjs/common';
import { ParserService } from 'Y/parser';

@Injectable()
export class GratesService {
	constructor(private readonly parserService: ParserService) {}
	findOne() {
		return this.parserService.parsePage();
	}
}
