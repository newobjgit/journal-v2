import { HttpException, HttpStatus, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ClassRoom, ClassRoomDocument } from '../schemas/class-room.schema';
import { CreateClassRoomDto } from '../dto/class-room/create-class-room.dto';
import { UpdateClassRoomDto } from '../dto/class-room/update-class-room.dto';

@Injectable()
export class ClassRoomService {
  private readonly logger = new Logger(ClassRoomService.name);

  constructor(
    @InjectModel(ClassRoom.name) private classRoomDocumentModel: Model<ClassRoomDocument>
  ) {}

  async create(createClassRoomDto: CreateClassRoomDto): Promise<ClassRoom> {
    try {
      const newRoom = new this.classRoomDocumentModel(createClassRoomDto);
      return await newRoom.save()
    } catch (e) {
      this.logger.error(e);
      throw new HttpException(`Error: ${e}`, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(): Promise<ClassRoom[]> {
    try {
      return await this.classRoomDocumentModel.find().exec()
    } catch (e) {
      this.logger.error(e);
      throw new HttpException(`Error: ${e}`, HttpStatus.BAD_REQUEST);
    }
  }

  async findById(_id: string): Promise<ClassRoom> {
    try {
      return await this.classRoomDocumentModel.findById(_id).exec()
    } catch (e) {
      this.logger.error(e);
      throw new HttpException(`Error: ${e}`, HttpStatus.BAD_REQUEST);
    }
  }

  async update(_id: string, updateClassRoomDto: UpdateClassRoomDto): Promise<ClassRoom> {
    try {
      const existingRoom = await this.classRoomDocumentModel.findByIdAndUpdate(
        { _id },
        updateClassRoomDto,
      );

      if (!existingRoom) {
        throw new NotFoundException(`Class room #${_id} not found`);
      }

      return existingRoom
    } catch (e) {
      this.logger.error(e);
      throw new HttpException(`Error: ${e}`, HttpStatus.BAD_REQUEST);
    }
  }

  async delete(_id: string): Promise<ClassRoom> {
    try {
      return this.classRoomDocumentModel.findByIdAndRemove(_id);
    } catch (e) {
      this.logger.error(e);
      throw new HttpException(`Error: ${e}`, HttpStatus.BAD_REQUEST);
    }
  }
}
