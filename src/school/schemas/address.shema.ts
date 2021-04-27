import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AddressDocument = Address & Document;

@Schema({
  timestamps: true,
})
export class Address {

  @Prop()
  country: string;

  @Prop()
  city: string;

  @Prop()
  street: string;

  @Prop()
  postIndex: string;
}

export const AddressSchema = SchemaFactory.createForClass(Address);
