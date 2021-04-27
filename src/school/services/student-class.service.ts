import { HttpException, HttpStatus, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateStudentClassDto } from '../dto/student-class/create-student-class.dto';
import { StudentClass, StudentClassDocument } from '../schemas/student-class.schema';
import { UpdateStudentClassDto } from '../dto/student-class/update-student-class.dto';

@Injectable()
export class StudentClassService {
  private readonly logger = new Logger(StudentClassService.name);

  constructor(
    @InjectModel(StudentClass.name) private studentClassDocumentModel: Model<StudentClassDocument>
  ) {}

  async create(createStudentClassDto: CreateStudentClassDto): Promise<StudentClass> {
    try {
      const newDepartment = new this.studentClassDocumentModel(createStudentClassDto);
      return await newDepartment.save()
    } catch (e) {
      this.logger.error(e);
      throw new HttpException(`Error: ${e}`, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(): Promise<StudentClass[]> {
    try {
      return await this.studentClassDocumentModel.find().exec()
    } catch (e) {
      this.logger.error(e);
      throw new HttpException(`Error: ${e}`, HttpStatus.BAD_REQUEST);
    }
  }

  async findById(_id: string): Promise<StudentClass> {
    try {
      return await this.studentClassDocumentModel.findById(_id).exec()
    } catch (e) {
      this.logger.error(e);
      throw new HttpException(`Error: ${e}`, HttpStatus.BAD_REQUEST);
    }
  }

  async update(_id: string, updateStudentClassDto: UpdateStudentClassDto): Promise<StudentClass> {
    try {
      const existingStudentClass = await this.studentClassDocumentModel.findByIdAndUpdate(
        { _id },
        updateStudentClassDto,
      );

      if (!existingStudentClass) {
        throw new NotFoundException(`Student class #${_id} not found`);
      }

      return existingStudentClass
    } catch (e) {
      this.logger.error(e);
      throw new HttpException(`Error: ${e}`, HttpStatus.BAD_REQUEST);
    }
  }

  async delete(_id: string): Promise<StudentClass> {
    try {
      return this.studentClassDocumentModel.findByIdAndRemove(_id);
    } catch (e) {
      this.logger.error(e);
      throw new HttpException(`Error: ${e}`, HttpStatus.BAD_REQUEST);
    }
  }
}
