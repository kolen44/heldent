import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CalendarUserDto {
	@IsDateString()
	@IsNotEmpty()
	public readonly date: Date;

	@IsString()
	@IsNotEmpty()
	public readonly subject: string;

	@IsNumber()
	@IsNotEmpty()
	public readonly curse: number;
}
