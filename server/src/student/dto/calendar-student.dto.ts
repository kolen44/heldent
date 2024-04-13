import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CalendarStudentDto {
	@IsDateString()
	@IsNotEmpty()
	public readonly date: string;

	@IsString()
	@IsNotEmpty()
	public readonly subject: string;

	@IsString()
	@IsNotEmpty()
	public readonly goal: string;
}
