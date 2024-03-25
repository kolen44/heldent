import { ChatDateType } from "./chat.type"

export class Chat {
    public readonly chatData: ChatDateType[]

    constructor(data: ChatDateType | ChatDateType[]) {
        this.chatData = Array.isArray(data) ? data : [data]
    }

    public addMessage(data: ChatDateType) {
        this.chatData.push(data)
        return this
    }
}
