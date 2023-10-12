import { PartialType } from '@nestjs/mapped-types';
import { CreateResidentDto } from './create-resident.dto';

export class UpdateDoctorDto extends PartialType(CreateResidentDto) {}
