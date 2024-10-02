export interface DiaryActions {
    createDiary: (title: string, content: string) => Promise<void>;
    getPIAResponse: (query: string) => Promise<void>;
    getEntries: (page: number, pageSize: number) => Promise<void>;
    deleteEntry: (id: string) => Promise<void>;
    updateEntry: (id: string, title: string, content: string) => Promise<void>;
    clearResponse: () => void;
    clearError: () => void;
    clearSuccess: () => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    setResponse: (response: string | null) => void;
    setSuccess: (success: boolean) => void;
}