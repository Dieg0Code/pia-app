export class ChatMessage {
    role: string;
    content: string;

    constructor(role: string, content: string) {
        this.role = role;
        this.content = content;
    }

    static fromJson(json: { [key: string]: any }): ChatMessage {
        return new ChatMessage(json['role'], json['content']);
    }

    toJson(): { [key: string]: any } {
        return {
            role: this.role,
            content: this.content
        };
    }
}