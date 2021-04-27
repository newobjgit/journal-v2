import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Entity } from '../../common/schemas/entity.schema';

export type PeriodDocument = Period & Document;
export type SemesterDocument = Semester & Document;
export type AcademicYearDocument = AcademicYear & Document;

const validator = value => value.length === 2;

@Schema({
  _id: false,
})
export class Period {
  @Prop()
  start: Date;

  @Prop()
  end: Date;
}

@Schema()
export class Semester extends Period {
  @Prop({
    validate: [validator, /* TODO: messages.periodValidator */],
    type: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Period' } ]
  })
  modules: Period[];
}

@Schema()
export class AcademicYear extends Entity {
  @Prop()
  start: Date;

  @Prop()
  end: Date;

  @Prop({
    validate: [validator, /* TODO: messages.periodValidator */],
    type: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Semester' } ]
  })
  semesters: Semester[];
}

export const PeriodSchema = SchemaFactory.createForClass(Period);
export const SemesterSchema = SchemaFactory.createForClass(Semester);
export const AcademicYearSchema = SchemaFactory.createForClass(AcademicYear);
