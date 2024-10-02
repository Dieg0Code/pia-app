import { createClient } from '@supabase/supabase-js';
import Constants from 'expo-constants';

// Accede a las variables de entorno a través de Constants.expoConfig.extra
const SUPABASE_URL = Constants.expoConfig?.extra?.supabaseUrl ?? '';
const SUPABASE_KEY = Constants.expoConfig?.extra?.supabaseAnonKey ?? '';

if (!SUPABASE_URL || !SUPABASE_KEY) {
    throw new Error('Supabase URL and Anon Key are required.');
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);