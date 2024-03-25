import { Injectable } from "@nestjs/common"
import axios from "axios"
import { GenerateTextDto } from "./dto/generate-text.dto"
import { Chat } from "./entities/chat/chat.entity"
import {
    YandexChatMessageRequest,
    YandexChatResponse,
    YandexChatRole,
} from "./types/yandex.type"

@Injectable()
export class AiChatService {
    private async getResponse(
        messages: YandexChatMessageRequest[],
    ): Promise<YandexChatResponse[] | null> {
        const url =
            "https://llm.api.cloud.yandex.net/foundationModels/v1/completion"

        const body = {
            modelUri: `gpt://${process.env.FOLDER_ID}/yandexgpt/latest`,
            completionOptions: {
                stream: false,
                temperature: 0.6, // FIXME поменять либо на |от 0 до 0.2| или |от 0.8 до 1|
                maxTokens: "2000",
            },
            messages,
        }

        const config = {
            headers: {
                Authorization: `Api-Key ${process.env.API_KEY}`,
                "x-folder-id": process.env.FOLDER_ID,
            },
        }

        try {
            const response = await axios.post(url, body, config)
            console.log(response.data.result.alternatives)
            return response.data.result.alternatives
        } catch (err) {
            if (err && err.response && err.response.data)
                console.log(err.response.data)
            if (err && err.data) console.log(err.data)
            return null
        }
    }

    async generate(generateTextDto: GenerateTextDto): Promise<Chat | null> {
        const { chat } = generateTextDto
        const messageData = await this.getResponse(chat.chatData)

        if (!messageData) return null

        return chat.addMessage({
            role: YandexChatRole.ASSISTANT,
            text: messageData[0].message.text,
        })
    }
}
