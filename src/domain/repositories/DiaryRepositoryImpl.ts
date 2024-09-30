import { DiaryRemoteDataSource } from '../../data/datasource/DiaryRemoteDatasource';
import { DiaryModel } from '../../data/models/Diary';
import { DiaryRepository } from './DiaryRepository';

export class DiaryRepositoryImpl implements DiaryRepository {

    private remoteDataSource: DiaryRemoteDataSource;

    constructor(remoteDataSource: DiaryRemoteDataSource) {
        this.remoteDataSource = remoteDataSource;
    }

    async createEntry(title: string, content: string): Promise<void> {
        const diaryModel = new DiaryModel(title, content);
        await this.remoteDataSource.createEntry(diaryModel);
    }

    async getPIAResponse(query: string): Promise<string> {
        return await this.remoteDataSource.getPIAResponse(query);
    }

}