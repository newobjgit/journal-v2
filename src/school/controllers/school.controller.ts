import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { SchoolService } from '../services/school.service';
import { CreateSchoolDto } from '../dto/school/create-school.dto';
import { UpdateSchoolDto } from '../dto/school/update-school.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('school')
@Controller('school')
export class SchoolController {
  constructor(private readonly schoolService: SchoolService) {}

  @Post()
  async create(@Body() createSchoolDto: CreateSchoolDto) {
    return await this.schoolService.create(createSchoolDto);
  }

  @Get()
  async findAll() {
    return await this.schoolService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.schoolService.findById(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateSchoolDto: UpdateSchoolDto) {
    return await this.schoolService.update(id, updateSchoolDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.schoolService.delete(id);
  }
}
