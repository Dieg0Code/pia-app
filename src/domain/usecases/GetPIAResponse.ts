import { DiaryRepository } from "../repositories/DiaryRepository";

export class GetPIAResponse {
    private diaryRepository: DiaryRepository;

    constructor(diaryRepository: DiaryRepository) {
        this.diaryRepository = diaryRepository;
    }

    async execute(query: string): Promise<string> {
        return await this.diaryRepository.getPIAResponse(query);
    }
}