export interface DiaryActions {
    createDiary: (title: string, content: string) => Promise<void>;
    getPIAResponse: (query: string) => Promise<void>;
    clearResponse: () => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    setResponse: (response: string | null) => void;
}