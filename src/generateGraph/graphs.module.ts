import { Module } from '@nestjs/common';
import { GenerateGraphController } from './generateGraph.controller';
import { GenerateGraphService } from './generateGraph.service';

@Module({
	controllers: [GenerateGraphController],
	providers: [GenerateGraphService],
})
export class GraphsModule {}
