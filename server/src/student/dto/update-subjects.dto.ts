import { Type } from 'class-transformer';
import {
	IsBoolean,
	IsDateString,
	IsNotEmpty,
	IsNumber,
	IsOptional,
	ValidateNested,
} from 'class-validator';

class UpdateGradeDto {
	@IsNotEmpty()
	@IsDateString()
	date: string;

	@IsNotEmpty()
	@IsNumber()
	grade: number;
}

class UpdateAttendanceDto {
	@IsNotEmpty()
	@IsDateString()
	date: string;

	@IsNotEmpty()
	@IsBoolean()
	attendance: boolean;
}

export class UpdateSubjectDto {
	@IsOptional()
	@ValidateNested({ each: true })
	@Type(() => UpdateGradeDto)
	grades?: UpdateGradeDto[];

	@IsOptional()
	@ValidateNested({ each: true })
	@Type(() => UpdateAttendanceDto)
	attendance?: UpdateAttendanceDto[];
}
