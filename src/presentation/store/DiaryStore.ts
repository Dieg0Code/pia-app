import axios from "axios";
import { DiaryRemoteDataSourceImpl } from "../../data/datasource/DiaryRemoteDatasourceImpl"
import { DiaryRepositoryImpl } from "../../domain/repositories/DiaryRepositoryImpl";
import { CreateDiary } from "../../domain/usecases/CreateDiary";
import { GetPIAResponse } from "../../domain/usecases/GetPIAResponse";
import { create } from "zustand";
import { DiaryState } from "./DiaryState";
import { DiaryActions } from "./DiaryActions";

const diaryRemoteDataSource = new DiaryRemoteDataSourceImpl(axios.create());
const diaryRepository = new DiaryRepositoryImpl(diaryRemoteDataSource);
const createDiaryUseCase = new CreateDiary(diaryRepository);
const getPIAResponseUseCase = new GetPIAResponse(diaryRepository);

export const useDiaryStore = create<DiaryState & DiaryActions>((set) => ({
    loading: false,
    error: null,
    response: null,

    setLoading: (loading) => set({ loading }),
    setError: (error) => set({ error }),
    setResponse: (response) => set({ response }),

    createDiary: async (title, content) => {
        set({ loading: true, error: null });
        try {
            await createDiaryUseCase.execute(title, content);
            set({ loading: false, response: 'Diary created successfully' });
        } catch (error) {
            set({
                loading: false,
                error: error instanceof Error ? error.message : 'An error occurred'
            });
        }
    },

    getPIAResponse: async (query) => {
        set({ loading: true, error: null });
        try {
            const response = await getPIAResponseUseCase.execute(query);
            set({ loading: false, response });
        } catch (error) {
            set({
                loading: false,
                error: error instanceof Error ? error.message : 'An error occurred'
            });
        }
    },

    clearResponse: () => set({ response: null }),
}));