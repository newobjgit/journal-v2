import { HttpException, HttpStatus, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Subject, SubjectDocument } from '../schemas/subject.schema';
import { UpdateSubjectDto } from '../dto/subject/update-subject.dto';
import { CreateSubjectDto } from '../dto/subject/create-subject.dto';

@Injectable()
export class SubjectService {
  private readonly logger = new Logger(SubjectService.name);

  constructor(
    @InjectModel(Subject.name) private subjectDocumentModel: Model<SubjectDocument>
  ) {}

  async create(createSubjectDto: CreateSubjectDto): Promise<Subject> {
    try {
      const newSubject = new this.subjectDocumentModel(createSubjectDto);
      return await newSubject.save()
    } catch (e) {
      this.logger.error(e);
      throw new HttpException(`Error: ${e}`, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(): Promise<Subject[]> {
    try {
      return await this.subjectDocumentModel.find().exec()
    } catch (e) {
      this.logger.error(e);
      throw new HttpException(`Error: ${e}`, HttpStatus.BAD_REQUEST);
    }
  }

  async findById(_id: string): Promise<Subject> {
    try {
      return await this.subjectDocumentModel.findById(_id).exec()
    } catch (e) {
      this.logger.error(e);
      throw new HttpException(`Error: ${e}`, HttpStatus.BAD_REQUEST);
    }
  }

  async update(_id: string, updateSubjectDto: UpdateSubjectDto): Promise<Subject> {
    try {
      const existingSubject = await this.subjectDocumentModel.findByIdAndUpdate(
        { _id },
        updateSubjectDto,
      );

      if (!existingSubject) {
        throw new NotFoundException(`Subject #${_id} not found`);
      }

      return existingSubject
    } catch (e) {
      this.logger.error(e);
      throw new HttpException(`Error: ${e}`, HttpStatus.BAD_REQUEST);
    }
  }

  async delete(_id: string): Promise<Subject> {
    try {
      return this.subjectDocumentModel.findByIdAndRemove(_id);
    } catch (e) {
      this.logger.error(e);
      throw new HttpException(`Error: ${e}`, HttpStatus.BAD_REQUEST);
    }
  }
}
