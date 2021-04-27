import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { SchoolObject } from '../../common/schemas/schoolObject.schema';
import * as mongoose from 'mongoose';

export type ClassRoomDocument = ClassRoom & Document;

@Schema({
  timestamps: true,
})
export class ClassRoom {

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'SchoolObject' })
  department: SchoolObject;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'SchoolObject' })
  user: SchoolObject;
}

export const ClassRoomSchema = SchemaFactory.createForClass(ClassRoom);
