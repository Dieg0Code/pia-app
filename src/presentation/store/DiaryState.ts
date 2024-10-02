import { DiaryDTO } from "@/src/data/models/DiaryDTO";

export interface DiaryState {
    loading: boolean;
    error: string | null;
    response: string | DiaryDTO[] | null;
}