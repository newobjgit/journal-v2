import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { SchoolObject } from '../../common/schemas/schoolObject.schema';
import * as mongoose from 'mongoose';
import { Entity } from '../../common/schemas/entity.schema';

export type StudentClassDocument = StudentClass & Document;
export type SubgroupDocument = Subgroup & Document;

@Schema({
  timestamps: true,
})
export class StudentClass extends Entity {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'SchoolObject' })
  department: SchoolObject;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'SchoolObject' })
  faculty: SchoolObject;

  @Prop({ type: [ { type: mongoose.Schema.Types.ObjectId, ref: 'SchoolObject' } ], })
  students: SchoolObject;

  @Prop({ type: [ { type: mongoose.Schema.Types.ObjectId, ref: 'SchoolObject' } ], })
  teachers: SchoolObject;
}

export class Subgroup extends Entity {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'SchoolObject' })
  studentClass: SchoolObject;

  @Prop({ type: [ { type: mongoose.Schema.Types.ObjectId, ref: 'SchoolObject' } ], })
  students: SchoolObject;
}

export const StudentClassSchema = SchemaFactory.createForClass(StudentClass);
export const SubgroupSchema = SchemaFactory.createForClass(Subgroup);
