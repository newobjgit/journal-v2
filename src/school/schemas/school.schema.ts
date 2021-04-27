import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Address } from './address.shema'
import * as mongoose from 'mongoose';
import { Entity } from '../../common/schemas/entity.schema';
import { SchoolTypesEnum } from '../../common/enums/school-types.enum';
import { OwnershipEnum } from '../../common/enums/ownership.enum';

export type SchoolDocument = School & Document;

@Schema({
  timestamps: true,
})
export class School extends Entity {

  @Prop()
  foundationDate: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Address' })
  address: Address;

  @Prop([String])
  phones: string[];

  @Prop({
    enum: [...Object.values(OwnershipEnum)],
  })
  ownership: OwnershipEnum;

  @Prop([String])
  emails: string[];

  @Prop({
    enum: [...Object.values(SchoolTypesEnum)],
  })
  type: SchoolTypesEnum;
}

export const SchoolSchema = SchemaFactory.createForClass(School);

