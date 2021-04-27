import { HttpException, HttpStatus, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Department, DepartmentDocument } from '../schemas/department.schema';
import { CreateDepartmentDto } from '../dto/department/create-department.dto';
import { UpdateDepartmentDto } from '../dto/department/update-department.dto';

@Injectable()
export class DepartmentService {
  private readonly logger = new Logger(DepartmentService.name);

  constructor(
    @InjectModel(Department.name) private departmentDocumentModel: Model<DepartmentDocument>
  ) {}

  async create(createDepartmentDto: CreateDepartmentDto): Promise<Department> {
    try {
      const newDepartment = new this.departmentDocumentModel(createDepartmentDto);
      return await newDepartment.save()
    } catch (e) {
      this.logger.error(e);
      throw new HttpException(`Error: ${e}`, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(): Promise<Department[]> {
    try {
      return await this.departmentDocumentModel.find().exec()
    } catch (e) {
      this.logger.error(e);
      throw new HttpException(`Error: ${e}`, HttpStatus.BAD_REQUEST);
    }
  }

  async findById(_id: string): Promise<Department> {
    try {
      return await this.departmentDocumentModel.findById(_id).exec()
    } catch (e) {
      this.logger.error(e);
      throw new HttpException(`Error: ${e}`, HttpStatus.BAD_REQUEST);
    }
  }

  async update(_id: string, updateDepartmentDto: UpdateDepartmentDto): Promise<Department> {
    try {
      const existingDepartment = await this.departmentDocumentModel.findByIdAndUpdate(
        { _id },
        updateDepartmentDto,
      );

      if (!existingDepartment) {
        throw new NotFoundException(`Department #${_id} not found`);
      }

      return existingDepartment
    } catch (e) {
      this.logger.error(e);
      throw new HttpException(`Error: ${e}`, HttpStatus.BAD_REQUEST);
    }
  }

  async delete(_id: string): Promise<Department> {
    try {
      return this.departmentDocumentModel.findByIdAndRemove(_id);
    } catch (e) {
      this.logger.error(e);
      throw new HttpException(`Error: ${e}`, HttpStatus.BAD_REQUEST);
    }
  }
}
