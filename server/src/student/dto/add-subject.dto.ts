import { IsNotEmpty, IsNumber } from 'class-validator';

export class AddSubjectDto {
	@IsNumber()
	@IsNotEmpty()
	subjectId: number;
}
