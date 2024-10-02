import { DiaryDTO } from "@/src/data/models/DiaryDTO";
import { DiaryRepository } from "../repositories/DiaryRepository";

export class GetEntries {
    private diaryRepository: DiaryRepository;

    constructor(diaryRepository: DiaryRepository) {
        this.diaryRepository = diaryRepository;
    }

    async execute(page: number, pageSize: number): Promise<DiaryDTO[]> {
        return await this.diaryRepository.getEntries(page, pageSize);
    }
}