import { ChatDateType } from './chat.type';

export class Chat {
	public readonly chatData: ChatDateType[];

	constructor(data: ChatDateType | ChatDateType[]) {
		this.chatData = Array.isArray(data) ? data : [data];
	}

	public addMessage(data: ChatDateType) {
		this.chatData.push(data);
		return this;
	}

	public getMessageIndex(index: number) {
		if (index < 0 || index >= this.chatData.length) return undefined;
		return this.chatData[index];
	}

	public getLastMessage() {
		return this.chatData[this.chatData.length - 1];
	}
}
