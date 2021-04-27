import { ApiProperty } from '@nestjs/swagger';
import { GenderEnum } from '../../common/enums/gender.enum';
import { RoleEnum } from '../../common/enums/role.enum';

export class CreateUserDto {
  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  fatherName: string;

  @ApiProperty()
  gender: GenderEnum;

  @ApiProperty()
  email: string;

  @ApiProperty()
  role: RoleEnum;

  @ApiProperty()
  birthDate: string;

  @ApiProperty()
  imgUrl: string;

  @ApiProperty()
  language: string;

  phones: string[];
}
