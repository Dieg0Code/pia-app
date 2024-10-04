import { ChatHistory } from "@/src/data/models/ChatHistory";
import { DiaryDTO } from "@/src/data/models/DiaryDTO";

export interface DiaryState {
    loading: boolean;
    error: string | null;
    success: boolean;
    updateSuccess: boolean;
    response: string | DiaryDTO[] | null;
    chatHistory: ChatHistory;
    piaResponse: string | null;
}