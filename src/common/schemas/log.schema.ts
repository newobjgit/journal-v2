import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchoolObject } from './schoolObject.schema';

@Schema()
export class Log {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SchoolObjectSchema',
  })
  author: SchoolObject;

  @Prop()
  action: string;

  @Prop()
  createdAt: Date;
}

export const LogSchema = SchemaFactory.createForClass(Log);
