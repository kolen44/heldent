import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GratesService } from './grates.service';
import { CreateGrateDto } from './dto/create-grate.dto';
import { UpdateGrateDto } from './dto/update-grate.dto';

@Controller('grates')
export class GratesController {
  constructor(private readonly gratesService: GratesService) {}

  @Post()
  create(@Body() createGrateDto: CreateGrateDto) {
    return this.gratesService.create(createGrateDto);
  }

  @Get()
  findAll() {
    return this.gratesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gratesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGrateDto: UpdateGrateDto) {
    return this.gratesService.update(+id, updateGrateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gratesService.remove(+id);
  }
}
