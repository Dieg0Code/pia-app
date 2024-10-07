export class UserMessageDTO {
    id: string;
    messageContent: string;
    senderLocation: string;

    constructor(id: string, messageContent: string, senderLocation: string,) {
        this.id = id;
        this.messageContent = messageContent;
        this.senderLocation = senderLocation;
    }

    static fromJson(json: { [key: string]: any }): UserMessageDTO {
        return new UserMessageDTO(json['id'], json['message_content'], json['sender_location']);
    }

    toJson(): { [key: string]: any } {
        return {
            id: this.id,
            messageContent: this.messageContent,
            senderLocation: this.senderLocation,
        };
    }
}