import { DiaryRepository } from "../repositories/DiaryRepository";

export class CreateDiary {
    private diaryRepository: DiaryRepository;

    constructor(diaryRepository: DiaryRepository) {
        this.diaryRepository = diaryRepository;
    }

    async execute(title: string, content: string): Promise<void> {
        return await this.diaryRepository.createEntry(title, content);
    }
}