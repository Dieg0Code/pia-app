import { DiaryModel } from "@/src/data/models/Diary";
import { DiaryRepository } from "../repositories/DiaryRepository";

export class UpdateEntry {
    private diaryRepository: DiaryRepository;

    constructor(diaryRepository: DiaryRepository) {
        this.diaryRepository = diaryRepository;
    }

    async execute(id: string, title: string, content: string): Promise<boolean> {
        return await this.diaryRepository.updateEntry(id, title, content);
    }
}