import { DiaryModel } from "../models/Diary";

export interface DiaryRemoteDataSource {
    createEntry(entry: DiaryModel): Promise<void>;
    getPIAResponse(query: string): Promise<string>;
}