import { DiaryModel } from "../models/Diary";
import { SemanticQueryWithChatHistory } from "../models/SemanticQueryWithChatHistory";

export interface DiaryRemoteDataSource {
    createEntry(entry: DiaryModel): Promise<void>;
    getPIAResponse(queryWithChatHistory: SemanticQueryWithChatHistory): Promise<any>;
}