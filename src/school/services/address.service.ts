import { HttpException, HttpStatus, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Address, AddressDocument } from '../schemas/address.shema';
import { CreateAddressDto } from '../dto/address/create-address.dto';
import { UpdateAddressDto } from '../dto/address/update-address.dto';

@Injectable()
export class AddressService {
  private readonly logger = new Logger(AddressService.name);

  constructor(
    @InjectModel(Address.name) private addressDocumentModel: Model<AddressDocument>
  ) {}

  async create(createAddressDto: CreateAddressDto): Promise<Address> {
    try {
      const newAddress = new this.addressDocumentModel(createAddressDto);
      return await newAddress.save()
    } catch (e) {
      this.logger.error(e);
      throw new HttpException(`Error: ${e}`, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(): Promise<Address[]> {
    try {
      return await this.addressDocumentModel.find().exec()
    } catch (e) {
      this.logger.error(e);
      throw new HttpException(`Error: ${e}`, HttpStatus.BAD_REQUEST);
    }
  }

  async findById(_id: string): Promise<Address> {
    try {
      return await this.addressDocumentModel.findById(_id).exec()
    } catch (e) {
      this.logger.error(e);
      throw new HttpException(`Error: ${e}`, HttpStatus.BAD_REQUEST);
    }
  }

  async update(_id: string, updateAddressDto: UpdateAddressDto): Promise<Address> {
    try {
      const existingAddress = await this.addressDocumentModel.findByIdAndUpdate(
        { _id },
        updateAddressDto,
      );

      if (!existingAddress) {
        throw new NotFoundException(`Address #${_id} not found`);
      }

      return existingAddress
    } catch (e) {
      this.logger.error(e);
      throw new HttpException(`Error: ${e}`, HttpStatus.BAD_REQUEST);
    }
  }

  async delete(_id: string): Promise<Address> {
    try {
      return this.addressDocumentModel.findByIdAndRemove(_id);
    } catch (e) {
      this.logger.error(e);
      throw new HttpException(`Error: ${e}`, HttpStatus.BAD_REQUEST);
    }
  }
}
