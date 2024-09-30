export interface DiaryRepository {
    createEntry(title: string, content: string): Promise<void>;
    getPIAResponse(query: string): Promise<string>;
}