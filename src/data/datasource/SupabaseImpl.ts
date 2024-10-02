import { supabase } from "@/src/core/constants/SupabaseConstants";
import { DiaryModel } from "../models/Diary";
import { Supabase } from "./Supabase";
import { DiaryDTO } from "../models/DiaryDTO";

export class SupabaseImpl implements Supabase {

    async getEntries(page: number = 1, pageSize: number = 10): Promise<DiaryDTO[]> {
        const start = (page - 1) * pageSize;
        const end = start + pageSize - 1;

        try {
            const { data, error } = await supabase
                .from('diary')
                .select('id, title, content')
                .range(start, end);

            if (error) {
                console.error('Error fetching data:', error.message);
                return [];
            }

            return data.map((entry: any) => DiaryDTO.fromJson(entry));
        } catch (err) {
            console.error('Unexpected error fetching data:', err);
            return [];
        }
    }

    async deleteEntry(id: string): Promise<boolean> {
        try {
            const { error } = await supabase
                .from('diary')
                .delete()
                .eq('id', id);

            if (error) {
                console.error('Error deleting entry:', error.message);
                return false;
            }

            return true;
        } catch (err) {
            console.error('Unexpected error deleting entry:', err);
            return false;
        }
    }

    async updateEntry(id: string, data: Partial<DiaryModel>): Promise<boolean> {
        try {
            const { error } = await supabase
                .from('diary')
                .update(data)
                .eq('id', id);

            if (error) {
                console.error('Error updating entry:', error.message);
                return false;
            }

            return true;
        } catch (err) {
            console.error('Unexpected error updating entry:', err);
            return false;
        }
    }
}