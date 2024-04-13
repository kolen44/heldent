import { AiChatModule } from '@ai-chat/ai-chat';
import { TokenModule } from '@app/token';
import { Module } from '@nestjs/common';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';

@Module({
	imports: [TokenModule, AiChatModule],
	controllers: [StudentController],
	providers: [StudentService],
})
export class StudentModule {}
