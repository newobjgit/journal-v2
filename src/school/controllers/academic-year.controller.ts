import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AcademicYearService } from '../services/academic-year.service';
import { CreateAcademicYearDto } from '../dto/academic-year/create-academic-year.dto';
import { UpdateAcademicYearDto } from '../dto/academic-year/update-academic-year.dto';

@ApiTags('academic-year')
@Controller('academic-year')
export class AcademicYearController {
  constructor(private readonly academicYearService: AcademicYearService) {}

  @Post()
  async create(@Body() createAcademicYearDto: CreateAcademicYearDto) {
    return await this.academicYearService.create(createAcademicYearDto);
  }

  @Get()
  async findAll() {
    return await this.academicYearService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.academicYearService.findById(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateAcademicYearDto: UpdateAcademicYearDto) {
    return await this.academicYearService.update(id, updateAcademicYearDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.academicYearService.delete(id);
  }
}
