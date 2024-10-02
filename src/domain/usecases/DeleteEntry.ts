import { DiaryRepository } from "../repositories/DiaryRepository";

export class DeleteEntry {
    private diaryRepository: DiaryRepository;

    constructor(diaryRepository: DiaryRepository) {
        this.diaryRepository = diaryRepository;
    }

    async execute(id: string): Promise<boolean> {
        return await this.diaryRepository.deleteEntry(id);
    }
}