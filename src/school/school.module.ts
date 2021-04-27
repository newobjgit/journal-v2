import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { School, SchoolSchema } from './schemas/school.schema';
import { Address, AddressSchema } from './schemas/address.shema';
import {
  AcademicYear,
  AcademicYearSchema,
  Period,
  PeriodSchema,
  Semester,
  SemesterSchema,
} from './schemas/academic-year.schema';
import { ClassRoom, ClassRoomSchema } from './schemas/class-room.schema';
import { Department, DepartmentSchema, Faculty, FacultySchema } from './schemas/department.schema';
import { Subject, SubjectSchema } from './schemas/subject.schema';
import { SchoolController } from './controllers/school.controller';
import { SchoolService } from './services/school.service';
import { StudentClass, StudentClassSchema, Subgroup, SubgroupSchema } from './schemas/student-class.schema';
import { AcademicYearController } from './controllers/academic-year.controller';
import { AddressController } from './controllers/address.controller';
import { ClassRoomController } from './controllers/class-room.controller';
import { DepartmentController } from './controllers/department.controller';
import { StudentClassController } from './controllers/student-class.controller';
import { SubjectController } from './controllers/subject.controller';
import { AcademicYearService } from './services/academic-year.service';
import { AddressService } from './services/address.service';
import { ClassRoomService } from './services/class-room.service';
import { DepartmentService } from './services/department.service';
import { StudentClassService } from './services/student-class.service';
import { SubjectService } from './services/subject.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: School.name, schema: SchoolSchema, },
      { name: Address.name, schema: AddressSchema, },
      { name: Period.name, schema: PeriodSchema, },
      { name: Semester.name, schema: SemesterSchema, },
      { name: AcademicYear.name, schema: AcademicYearSchema, },
      { name: ClassRoom.name, schema: ClassRoomSchema, },
      { name: Faculty.name, schema: FacultySchema, },
      { name: Department.name, schema: DepartmentSchema, },
      { name: StudentClass.name, schema: StudentClassSchema, },
      { name: Subgroup.name, schema: SubgroupSchema, },
      { name: Subject.name, schema: SubjectSchema, },
    ],'main'),
  ],
  controllers: [
    SchoolController,
    AcademicYearController,
    AddressController,
    ClassRoomController,
    DepartmentController,
    StudentClassController,
    SubjectController,
  ],
  providers: [
    SchoolService,
    AcademicYearService,
    AddressService,
    ClassRoomService,
    DepartmentService,
    StudentClassService,
    SubjectService,
  ]
})
export class SchoolModule {}
