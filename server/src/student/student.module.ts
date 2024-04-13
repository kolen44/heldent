import { AiChatModule } from '@ai-chat/ai-chat';
import { Module } from '@nestjs/common';
import { TokenModule } from '@token/token';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';

@Module({
	imports: [TokenModule, AiChatModule],
	controllers: [StudentController],
	providers: [StudentService],
})
export class StudentModule {}
