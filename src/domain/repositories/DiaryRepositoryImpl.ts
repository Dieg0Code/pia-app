import { DiaryDTO } from '@/src/data/models/DiaryDTO';
import { DiaryRemoteDataSource } from '../../data/datasource/DiaryRemoteDatasource';
import { DiaryModel } from '../../data/models/Diary';
import { DiaryRepository } from './DiaryRepository';
import { Supabase } from '@/src/data/datasource/Supabase';
import { ChatHistory } from '@/src/data/models/ChatHistory';
import { SemanticQueryWithChatHistory } from '@/src/data/models/SemanticQueryWithChatHistory';

export class DiaryRepositoryImpl implements DiaryRepository {

    private remoteDataSource: DiaryRemoteDataSource;
    private supabase: Supabase;

    constructor(remoteDataSource: DiaryRemoteDataSource, supabase: Supabase) {
        this.remoteDataSource = remoteDataSource;
        this.supabase = supabase;
    }

    async getPIAResponse(query: string, chatHistory: ChatHistory): Promise<string> {
        const queryWithChatHistory = new SemanticQueryWithChatHistory(query, chatHistory);
        return await this.remoteDataSource.getPIAResponse(queryWithChatHistory);
    }

    async getEntries(page: number, pageSize: number): Promise<DiaryDTO[]> {
        return await this.supabase.getEntries(page, pageSize);
    }

    async deleteEntry(id: string): Promise<boolean> {
        return await this.supabase.deleteEntry(id);
    }

    async updateEntry(id: string, title: string, content: string): Promise<boolean> {
        const diaryModel = new DiaryModel(title, content);
        return await this.supabase.updateEntry(id, diaryModel);
    }

    async createEntry(title: string, content: string): Promise<void> {
        const diaryModel = new DiaryModel(title, content);
        await this.remoteDataSource.createEntry(diaryModel);
    }
}