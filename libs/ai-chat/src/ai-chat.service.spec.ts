import * as dotenv from "dotenv"
dotenv.config()

import { Test, TestingModule } from "@nestjs/testing"
import axios from "axios"
import { AiChatService } from "./ai-chat.service"
import { GenerateTextDto } from "./dto/generate-text.dto"
import { Chat } from "./entities/chat/chat.entity"
import { YandexChatRole } from "./types/yandex.type"

describe("AiChatService", () => {
    let service: AiChatService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AiChatService],
        }).compile()

        service = module.get<AiChatService>(AiChatService)
    })

    it("should be defined", () => {
        expect(service).toBeDefined()
    })

    it("test generate", async () => {
        const postSpy = jest.spyOn(axios, "post").mockResolvedValue({
            data: {
                result: {
                    alternatives: [
                        {
                            message: { role: "assistant", text: "answer" },
                        },
                    ],
                },
            },
        })

        const chat = new Chat({
            role: YandexChatRole.USER,
            text: "question",
        })

        const generateTextDto = new GenerateTextDto(chat)

        expect(await service.generate(generateTextDto)).toEqual(chat)
        console.log("test generate", chat)

        postSpy.mockRestore()
    })

    it("test generate with api key", async () => {
        if (!process.env.API_KEY || !process.env.FOLDER_ID) return

        const chat = new Chat({
            role: YandexChatRole.USER,
            text: "question",
        })

        const generateTextDto = new GenerateTextDto(chat)

        expect(await service.generate(generateTextDto)).toBeInstanceOf(Chat)

        console.log("test generate with api key", chat)
    })
})
