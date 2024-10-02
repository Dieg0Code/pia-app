import { DiaryDTO } from "@/src/data/models/DiaryDTO";

export interface DiaryRepository {
    createEntry(title: string, content: string): Promise<void>;
    getPIAResponse(query: string): Promise<string>;
    getEntries(page: number, pageSize: number): Promise<DiaryDTO[]>;
    deleteEntry(id: string): Promise<boolean>;
    updateEntry(id: string, title: string, content: string): Promise<boolean>;
}