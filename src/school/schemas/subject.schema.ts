import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { SchoolObject } from '../../common/schemas/schoolObject.schema';
import * as mongoose from 'mongoose';
import { Entity } from '../../common/schemas/entity.schema';

export type SubjectDocument = Subject & Document;

@Schema()
export class Subject extends Entity {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'SchoolObject' })
  department: SchoolObject;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'SchoolObject' })
  faculty: SchoolObject;
}

export const SubjectSchema = SchemaFactory.createForClass(Subject);
