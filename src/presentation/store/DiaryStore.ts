import axios from "axios";
import { DiaryRemoteDataSourceImpl } from "../../data/datasource/DiaryRemoteDatasourceImpl"
import { DiaryRepositoryImpl } from "../../domain/repositories/DiaryRepositoryImpl";
import { CreateDiary } from "../../domain/usecases/CreateDiary";
import { GetPIAResponse } from "../../domain/usecases/GetPIAResponse";
import { create } from "zustand";
import { DiaryState } from "./DiaryState";
import { DiaryActions } from "./DiaryActions";
import { SupabaseImpl } from "@/src/data/datasource/SupabaseImpl";
import { GetEntries } from "@/src/domain/usecases/GetEntries";
import { DiaryDTO } from "@/src/data/models/DiaryDTO";
import { UpdateEntry } from "@/src/domain/usecases/UpdateEntry";
import { DeleteEntry } from "@/src/domain/usecases/DeleteEntry";

const supabaseClient = new SupabaseImpl();
const diaryRemoteDataSource = new DiaryRemoteDataSourceImpl(axios.create());
const diaryRepository = new DiaryRepositoryImpl(diaryRemoteDataSource, supabaseClient);
const createDiaryUseCase = new CreateDiary(diaryRepository);
const getPIAResponseUseCase = new GetPIAResponse(diaryRepository);
const getEntriesUseCase = new GetEntries(diaryRepository);
const updateEntryUseCase = new UpdateEntry(diaryRepository);
const deleteEntryUseCase = new DeleteEntry(diaryRepository);

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

    getEntries: async (page, pageSize) => {
        set({ loading: true, error: null });
        try {
            const entries: DiaryDTO[] = await getEntriesUseCase.execute(page, pageSize);
            set({ loading: false, response: entries });
        } catch (error) {
            set({
                loading: false,
                error: error instanceof Error ? error.message : 'An error occurred'
            });
        }
    },

    updateEntry: async (id, title, content) => {
        set({ loading: true, error: null });
        try {
            const success: boolean = await updateEntryUseCase.execute(id, title, content);
            if (success) {
                set({ loading: false, response: 'Diary updated successfully' });
            } else {
                set({ loading: false, error: 'An error occurred' });
            }
        } catch (error) {
            set({
                loading: false,
                error: error instanceof Error ? error.message : 'An error occurred'
            });
        }
    },

    deleteEntry: async (id) => {
        set({ loading: true, error: null });
        try {
            const success: boolean = await deleteEntryUseCase.execute(id);
            if (success) {
                set({ loading: false, response: 'Diary deleted successfully' });
            } else {
                set({ loading: false, error: 'An error occurred' });
            }
        } catch (error) {
            set({
                loading: false,
                error: error instanceof Error ? error.message : 'An error occurred'
            });

        }
    },

    clearResponse: () => set({ response: null }),
    clearError: () => set({ error: null }),
}));