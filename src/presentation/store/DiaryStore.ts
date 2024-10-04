import axios from "axios";
import { create } from "zustand";
import { DiaryRemoteDataSourceImpl } from "../../data/datasource/DiaryRemoteDatasourceImpl"
import { DiaryRepositoryImpl } from "../../domain/repositories/DiaryRepositoryImpl";
import { CreateDiary } from "../../domain/usecases/CreateDiary";
import { GetPIAResponse } from "../../domain/usecases/GetPIAResponse";
import { DiaryState } from "./DiaryState";
import { DiaryActions } from "./DiaryActions";
import { SupabaseImpl } from "@/src/data/datasource/SupabaseImpl";
import { GetEntries } from "@/src/domain/usecases/GetEntries";
import { DiaryDTO } from "@/src/data/models/DiaryDTO";
import { UpdateEntry } from "@/src/domain/usecases/UpdateEntry";
import { DeleteEntry } from "@/src/domain/usecases/DeleteEntry";
import { ChatHistory } from "@/src/data/models/ChatHistory";
import { ChatMessage } from "@/src/data/models/ChatMessage";
import { SemanticQueryWithChatHistory } from "@/src/data/models/SemanticQueryWithChatHistory";
import { Vibration } from "react-native";

const supabaseClient = new SupabaseImpl();
const diaryRemoteDataSource = new DiaryRemoteDataSourceImpl(axios.create());
const diaryRepository = new DiaryRepositoryImpl(diaryRemoteDataSource, supabaseClient);
const createDiaryUseCase = new CreateDiary(diaryRepository);
const getPIAResponseUseCase = new GetPIAResponse(diaryRepository);
const getEntriesUseCase = new GetEntries(diaryRepository);
const updateEntryUseCase = new UpdateEntry(diaryRepository);
const deleteEntryUseCase = new DeleteEntry(diaryRepository);

export const useDiaryStore = create<DiaryState & DiaryActions>((set, get) => ({
    loading: false,
    error: null,
    success: false,
    updateSuccess: false,
    response: null,
    chatHistory: new ChatHistory([]),
    piaResponse: null,

    setLoading: (loading) => set({ loading }),
    setError: (error) => set({ error }),
    setResponse: (response) => set({ response }),
    setSuccess: (success) => set({ success }),

    createDiary: async (title, content) => {
        set({ loading: true, error: null, success: false });
        try {
            await createDiaryUseCase.execute(title, content);
            set({ loading: false, error: null, success: true });
        } catch (error) {
            set({
                loading: false,
                error: error instanceof Error ? error.message : 'An error occurred',
                success: false
            });
        }
    },

    getPIAResponse: async (query: string) => {
        set({ loading: true, error: null });
        try {
            const currentHistory = get().chatHistory;
            const userMessage = new ChatMessage('user', query);
            set({
                chatHistory: new ChatHistory([...currentHistory.messages, userMessage])
            })

            const response = await getPIAResponseUseCase.execute(query, currentHistory);
            console.log(response);
            const piaResponse = new ChatMessage('assistant', response);

            set({
                loading: false,
                piaResponse: response,
                chatHistory: new ChatHistory([
                    ...currentHistory.messages,
                    userMessage,
                    piaResponse
                ])
            });
        } catch (error) {
            set({
                loading: false,
                error: error instanceof Error ? error.message : 'An error occurred',
                piaResponse: null
            });
        }
    },

    addMessageToChatHistory: (role, content) => {
        set(state => ({
            chatHistory: new ChatHistory([
                ...state.chatHistory.messages,
                new ChatMessage(role, content)
            ])
        }));
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
        set({ loading: true, error: null, updateSuccess: false });
        try {
            const success: boolean = await updateEntryUseCase.execute(id, title, content);
            if (success) {
                set({ loading: false, updateSuccess: true });
            } else {
                set({ loading: false, error: 'An error occurred', updateSuccess: false });
            }
        } catch (error) {
            set({
                loading: false,
                error: error instanceof Error ? error.message : 'An error occurred',
                updateSuccess: false
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
    clearSuccess: () => set({ success: false }),
    clearChatHistory: () => {
        set({ chatHistory: new ChatHistory([]) });
    },
}));