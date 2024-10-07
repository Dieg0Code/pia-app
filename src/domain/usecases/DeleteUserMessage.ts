import { DiaryRepository } from "../repositories/DiaryRepository";

export class DeleteUserMessage {
    private diaryRepository: DiaryRepository;

    constructor(diaryRepository: DiaryRepository) {
        this.diaryRepository = diaryRepository;
    }

    async execute(messageId: string): Promise<boolean> {
        return await this.diaryRepository.deleteUserMessage(messageId);
    }
}