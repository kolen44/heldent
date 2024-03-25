import { Controller, Post } from '@nestjs/common';

@Controller('generate')
export class GenerateGraphController {
  @Post()
  addGenerated(): any {}
}
