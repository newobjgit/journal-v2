import { HttpException, HttpStatus, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectModel(User.name) private userDocumentModel: Model<UserDocument>
  ) {}

  async create(createUserDto: User): Promise<User> {
    try {
      const newUser = new this.userDocumentModel(createUserDto);
      return await newUser.save()
    } catch (e) {
      this.logger.error(e);
      throw new HttpException(`Error: ${e}`, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(): Promise<User[]> {
    try {
      return await this.userDocumentModel.find().exec()
    } catch (e) {
      this.logger.error(e);
      throw new HttpException(`Error: ${e}`, HttpStatus.BAD_REQUEST);
    }
  }

  async findById(_id: string): Promise<User> {
    try {
      return await this.userDocumentModel.findById(_id).exec()
    } catch (e) {
      this.logger.error(e);
      throw new HttpException(`Error: ${e}`, HttpStatus.BAD_REQUEST);
    }
  }

  async update(_id: string, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      const existingUser = await this.userDocumentModel.findByIdAndUpdate(
        { _id },
        updateUserDto,
      );

      if (!existingUser) {
        throw new NotFoundException(`User #${_id} not found`);
      }

      return existingUser
    } catch (e) {
      this.logger.error(e);
      throw new HttpException(`Error: ${e}`, HttpStatus.BAD_REQUEST);
    }
  }

  async delete(_id: string): Promise<User> {
    try {
      return this.userDocumentModel.findByIdAndRemove(_id);
    } catch (e) {
      this.logger.error(e);
      throw new HttpException(`Error: ${e}`, HttpStatus.BAD_REQUEST);
    }
  }
}
