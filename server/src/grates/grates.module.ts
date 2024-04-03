import { Module } from '@nestjs/common';
import { ParserModule } from 'Y/parser';
import { GratesController } from './grates.controller';
import { GratesService } from './grates.service';

@Module({
	imports: [ParserModule],
	controllers: [GratesController],
	providers: [GratesService],
})
export class GratesModule {}
