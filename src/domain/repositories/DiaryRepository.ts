import { ChatHistory } from "@/src/data/models/ChatHistory";
import { DiaryDTO } from "@/src/data/models/DiaryDTO";
import { SemanticQueryWithChatHistory } from "@/src/data/models/SemanticQueryWithChatHistory";

export interface DiaryRepository {
    createEntry(title: string, content: string): Promise<void>;
    getPIAResponse(query: string, chatHistory: ChatHistory): Promise<string>;
    getEntries(page: number, pageSize: number): Promise<DiaryDTO[]>;
    deleteEntry(id: string): Promise<boolean>;
    updateEntry(id: string, title: string, content: string): Promise<boolean>;
}