import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Entity } from '../../common/schemas/entity.schema';
import { GenderEnum } from '../../common/enums/gender.enum';
import { RoleEnum } from '../../common/enums/role.enum';
import { SchoolObject } from '../../common/schemas/schoolObject.schema';
import { ApiProperty } from '@nestjs/swagger';

export type UserDocument = User & Document;

const nameTemplate = {
  // TODO: match: [/^[a-zA-Z0-9]+$/, messages.invalidName],
}

const emailTemplate = {
  lowercase: true,
  // TODO: match: [/\S+@\S+\.\S+/, messages.emailInvalid],
}

@Schema({
  timestamps: true,
})
export class User extends Entity {

  @ApiProperty()
  @Prop(nameTemplate)
  firstName: string;

  @ApiProperty()
  @Prop(nameTemplate)
  lastName: string;

  @ApiProperty()
  @Prop(nameTemplate)
  fatherName: string;

  @ApiProperty({
    enum: GenderEnum,
  })
  @Prop({
    lowercase: true,
    enum: [...Object.values(GenderEnum)],
  })
  gender: GenderEnum;

  @ApiProperty()
  @Prop(emailTemplate)
  email: string;

  @ApiProperty({
    enum: RoleEnum,
  })

  @ApiProperty()
  @Prop({
    enum: [...Object.values(RoleEnum)]
  })
  role: RoleEnum;

  @ApiProperty()
  @Prop()
  birthDate: string;

  @ApiProperty()
  @Prop()
  imgUrl: string;

  @ApiProperty()
  @Prop({
    lowercase: true,
  })
  language: string;

  @ApiProperty()
  @Prop([String])
  phones: string[];

  @ApiProperty()
  @Prop([String])
  posts: string[];

  @ApiProperty()
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SchoolObject'
  })
  studentClass: SchoolObject;

  @ApiProperty()
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SchoolObject'
  })
  faculty: SchoolObject;

  @ApiProperty()
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SchoolObject'
  })
  department: SchoolObject;

  @ApiProperty({})
  @Prop({
    type: [ { type: mongoose.Schema.Types.ObjectId, ref: 'SchoolObject' } ]
  })
  relatives: SchoolObject;
}

export const UserSchema = SchemaFactory.createForClass(User);
