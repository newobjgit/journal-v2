import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { StudentClassService } from '../services/student-class.service';
import { CreateStudentClassDto } from '../dto/student-class/create-student-class.dto';
import { UpdateStudentClassDto } from '../dto/student-class/update-student-class.dto';

@ApiTags('student-class')
@Controller('student-class')
export class StudentClassController {
  constructor(private readonly studentClassService: StudentClassService) {}

  @Post()
  async create(@Body() createStudentClassDto: CreateStudentClassDto) {
    return await this.studentClassService.create(createStudentClassDto);
  }

  @Get()
  async findAll() {
    return await this.studentClassService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.studentClassService.findById(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateStudentClassDto: UpdateStudentClassDto) {
    return await this.studentClassService.update(id, updateStudentClassDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.studentClassService.delete(id);
  }
}
