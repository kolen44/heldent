import { Module } from "@nestjs/common"
import { AiChatService } from "./ai-chat.service"

@Module({
    providers: [AiChatService],
    exports: [AiChatService],
})
export class AiChatModule {}
