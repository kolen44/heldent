import { Chat } from "../entities/chat/chat.entity"

export class GenerateTextDto {
    public readonly chat: Chat

    constructor(chat: Chat) {
        this.chat = chat
    }
}
