import { UserMessageDTO } from "@/src/data/models/UserMessageDTO";
import { DiaryRepository } from "../repositories/DiaryRepository";

export class GetUserMessages {
    private diaryRepository: DiaryRepository;

    constructor(diaryRepository: DiaryRepository) {
        this.diaryRepository = diaryRepository;
    }

    async execute(page: number, pageSize: number): Promise<UserMessageDTO[]> {
        return await this.diaryRepository.getUserMessages(page, pageSize);
    }
}