import { HttpException, HttpStatus, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AcademicYear, AcademicYearDocument } from '../schemas/academic-year.schema';
import { CreateAcademicYearDto } from '../dto/academic-year/create-academic-year.dto';
import { UpdateAcademicYearDto } from '../dto/academic-year/update-academic-year.dto';

@Injectable()
export class AcademicYearService {
  private readonly logger = new Logger(AcademicYearService.name);

  constructor(
    @InjectModel(AcademicYear.name) private academicYearModel: Model<AcademicYearDocument>
  ) {}

  async create(createAcademicYearDto: CreateAcademicYearDto): Promise<AcademicYear> {
    try {
      const newYear = new this.academicYearModel(createAcademicYearDto);
      return await newYear.save()
    } catch (e) {
      this.logger.error(e);
      throw new HttpException(`Error: ${e}`, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(): Promise<AcademicYear[]> {
    try {
      return await this.academicYearModel.find().exec()
    } catch (e) {
      this.logger.error(e);
      throw new HttpException(`Error: ${e}`, HttpStatus.BAD_REQUEST);
    }
  }

  async findById(_id: string): Promise<AcademicYear> {
    try {
      return await this.academicYearModel.findById(_id).exec()
    } catch (e) {
      this.logger.error(e);
      throw new HttpException(`Error: ${e}`, HttpStatus.BAD_REQUEST);
    }
  }

  async update(_id: string, updateAcademicYearDto: UpdateAcademicYearDto): Promise<AcademicYear> {
    try {
      const existingAcademicYear = await this.academicYearModel.findByIdAndUpdate(
        { _id },
        updateAcademicYearDto,
      );

      if (!existingAcademicYear) {
        throw new NotFoundException(`Academic year #${_id} not found`);
      }

      return existingAcademicYear
    } catch (e) {
      this.logger.error(e);
      throw new HttpException(`Error: ${e}`, HttpStatus.BAD_REQUEST);
    }
  }

  async delete(_id: string): Promise<AcademicYear> {
    try {
      return this.academicYearModel.findByIdAndRemove(_id);
    } catch (e) {
      this.logger.error(e);
      throw new HttpException(`Error: ${e}`, HttpStatus.BAD_REQUEST);
    }
  }
}
