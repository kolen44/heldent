import { Module } from '@nestjs/common';
import { GratesService } from './grates.service';
import { GratesController } from './grates.controller';

@Module({
	controllers: [GratesController],
	providers: [GratesService],
})
export class GratesModule {}
