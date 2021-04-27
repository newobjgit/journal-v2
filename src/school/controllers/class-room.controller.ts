import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ClassRoomService } from '../services/class-room.service';
import { CreateClassRoomDto } from '../dto/class-room/create-class-room.dto';
import { UpdateClassRoomDto } from '../dto/class-room/update-class-room.dto';

@ApiTags('class-room')
@Controller('class-room')
export class ClassRoomController {
  constructor(private readonly classRoomService: ClassRoomService) {}

  @Post()
  async create(@Body() createClassRoomDto: CreateClassRoomDto) {
    return await this.classRoomService.create(createClassRoomDto);
  }

  @Get()
  async findAll() {
    return await this.classRoomService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.classRoomService.findById(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateClassRoomDto: UpdateClassRoomDto) {
    return await this.classRoomService.update(id, updateClassRoomDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.classRoomService.delete(id);
  }
}
