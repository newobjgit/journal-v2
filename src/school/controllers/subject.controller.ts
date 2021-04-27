import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SubjectService } from '../services/subject.service';
import { CreateSubjectDto } from '../dto/subject/create-subject.dto';
import { UpdateSubjectDto } from '../dto/subject/update-subject.dto';

@ApiTags('subject')
@Controller('subject')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @Post()
  async create(@Body() createSubjectDto: CreateSubjectDto) {
    return await this.subjectService.create(createSubjectDto);
  }

  @Get()
  async findAll() {
    return await this.subjectService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.subjectService.findById(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateSubjectDto: UpdateSubjectDto) {
    return await this.subjectService.update(id, updateSubjectDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.subjectService.delete(id);
  }
}
