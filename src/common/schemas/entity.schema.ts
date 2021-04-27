import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { SchoolObject } from './schoolObject.schema';
import { Log } from './log.schema'
import { EntityStatusEnum } from '../enums/entity-status.enum';

@Schema({
  timestamps: true,
})
export class Entity {
  @Prop()
  name: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SchoolObjectSchema',
  })
  school: SchoolObject;

  @Prop({
    enum: [...Object.values(EntityStatusEnum)],
    default: EntityStatusEnum.Active,
  })
  active: EntityStatusEnum;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SchoolObjectSchema',
  })
  author: SchoolObject;

  @Prop({
    type: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Log' } ],
  })
  log: Log[];
}

export const EntitySchema = SchemaFactory.createForClass(Entity);
