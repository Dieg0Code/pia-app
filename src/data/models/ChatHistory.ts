import { ChatMessage } from "./ChatMessage";

export class ChatHistory {
    messages: ChatMessage[];

    constructor(messages: ChatMessage[]) {
        this.messages = messages;
    }

    static fromJson(json: { [key: string]: any }): ChatHistory {
        return new ChatHistory(
            json['messages'].map((message: { [key: string]: any }) => ChatMessage.fromJson(message))
        );
    }

    toJson(): { [key: string]: any } {
        return {
            messages: this.messages.map(message => message.toJson())
        };
    }
}