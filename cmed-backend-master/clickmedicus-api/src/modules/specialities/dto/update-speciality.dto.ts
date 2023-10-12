import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateSpecialityDto } from './create-speciality.dto';

export class UpdateSpecialityDto extends PartialType(CreateSpecialityDto) {
	/**
	 * Speciality
	 */
	@IsNotEmpty()
	@IsString()
	speciality: string;
}
