import { IsNotEmpty, IsString } from 'class-validator';

export class AskAssistantDto {
	@IsString()
	role: string;

	@IsNotEmpty()
	@IsString()
	question: string;
}
