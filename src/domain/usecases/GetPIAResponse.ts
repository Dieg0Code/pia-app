import { DiaryRepository } from "../repositories/DiaryRepository";
import { ChatHistory } from "@/src/data/models/ChatHistory";

export class GetPIAResponse {
    private diaryRepository: DiaryRepository;

    constructor(diaryRepository: DiaryRepository) {
        this.diaryRepository = diaryRepository;
    }

    async execute(query: string, chatHistory: ChatHistory): Promise<string> {
        return await this.diaryRepository.getPIAResponse(query, chatHistory);
    }
}