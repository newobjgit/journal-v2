import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type SchoolObjectDocument = SchoolObject & Document;

@Schema()
export class SchoolObject {
  @ApiProperty()
  @Prop()
  name: string;

  @ApiProperty()
  @Prop()
  imgUrl: string;
}

export const SchoolObjectSchema = SchemaFactory.createForClass(SchoolObject);
