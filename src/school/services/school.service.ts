import { HttpException, HttpStatus, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { School, SchoolDocument } from '../schemas/school.schema';
import { Model } from 'mongoose';
import { CreateSchoolDto } from '../dto/school/create-school.dto';
import { UpdateSchoolDto } from '../dto/school/update-school.dto';

@Injectable()
export class SchoolService {
  private readonly logger = new Logger(SchoolService.name);

  constructor(
    @InjectModel(School.name) private schoolModel: Model<SchoolDocument>
  ) {}

  async create(createSchoolDto: CreateSchoolDto): Promise<School> {
    try {
      const newSchool = new this.schoolModel(createSchoolDto);
      return await newSchool.save()
    } catch (e) {
      this.logger.error(e);
      throw new HttpException(`Error: ${e}`, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(): Promise<School[]> {
    try {
      return await this.schoolModel.find().exec()
    } catch (e) {
      this.logger.error(e);
      throw new HttpException(`Error: ${e}`, HttpStatus.BAD_REQUEST);
    }
  }

  async findById(_id: string): Promise<School> {
    try {
      return await this.schoolModel.findById(_id).exec()
    } catch (e) {
      this.logger.error(e);
      throw new HttpException(`Error: ${e}`, HttpStatus.BAD_REQUEST);
    }
  }

  async update(_id: string, updateSchoolDto: UpdateSchoolDto): Promise<School> {
    try {
      const existingSchool = await this.schoolModel.findByIdAndUpdate(
        { _id },
        updateSchoolDto,
      );

      if (!existingSchool) {
        throw new NotFoundException(`School #${_id} not found`);
      }

      return existingSchool
    } catch (e) {
      this.logger.error(e);
      throw new HttpException(`Error: ${e}`, HttpStatus.BAD_REQUEST);
    }
  }

  async delete(_id: string): Promise<School> {
    try {
      return this.schoolModel.findByIdAndRemove(_id);
    } catch (e) {
      this.logger.error(e);
      throw new HttpException(`Error: ${e}`, HttpStatus.BAD_REQUEST);
    }
  }
}
