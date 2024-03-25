export enum YandexChatRole {
    USER = "user",
    SYSTEM = "system",
    ASSISTANT = "assistant",
}

export type YandexChatMessageRequest = {
    role: YandexChatRole
    text: string
}

export type YandexChatResponse = {
    message: {
        role: YandexChatRole
        text: string
    }
    status: string // TODO можно сделать enum ошибок или ответов
}
