import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Entity } from '../../common/schemas/entity.schema';

export type FacultyDocument = Faculty & Document;
export type DepartmentDocument = Department & Document;

@Schema()
export class Faculty extends Entity {
}

@Schema()
export class Department extends Entity {
}

export const FacultySchema = SchemaFactory.createForClass(Faculty);
export const DepartmentSchema = SchemaFactory.createForClass(Department);
