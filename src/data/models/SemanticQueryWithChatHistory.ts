import { ChatHistory } from "./ChatHistory";

export class SemanticQueryWithChatHistory {
    query: string;
    history: ChatHistory;

    constructor(query: string, history: ChatHistory) {
        this.query = query;
        this.history = history;
    }

    static fromJson(json: { [key: string]: any }): SemanticQueryWithChatHistory {
        return new SemanticQueryWithChatHistory(
            json['query'],
            ChatHistory.fromJson(json['history'])
        );
    }

    toJson(): { [key: string]: any } {
        return {
            query: this.query,
            history: this.history.toJson()
        };
    }
}