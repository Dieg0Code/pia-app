import { DiaryModel } from "../models/Diary";
import { DiaryDTO } from "../models/DiaryDTO";
import { UserMessageDTO } from "../models/UserMessageDTO";

export interface Supabase {
    getEntries(page: number, pageSize: number): Promise<DiaryDTO[]>;
    deleteEntry(id: string): Promise<boolean>;
    updateEntry(id: string, data: Partial<DiaryModel>): Promise<boolean>;
    getUserMessages(page: number, pageSize: number): Promise<UserMessageDTO[]>;
    deleteUserMessage(id: string): Promise<boolean>;
}