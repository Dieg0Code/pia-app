import { DiaryDTO } from "@/src/data/models/DiaryDTO";

export interface DiaryState {
    loading: boolean;
    error: string | null;
    success: boolean;
    updateSuccess: boolean;
    response: string | DiaryDTO[] | null;
}