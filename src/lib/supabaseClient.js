import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const isConfigured = supabaseUrl && supabaseAnonKey;

// Use placeholder URL if missing to prevent createClient from throwing "supabaseUrl is required" and crashing the app
const finalUrl = isConfigured ? supabaseUrl : 'https://placeholder-project.supabase.co';
const finalKey = isConfigured ? supabaseAnonKey : 'placeholder-anon-key';

if (!isConfigured) {
  console.warn("Supabase credentials are missing. React app is running in placeholder mode.");
}

export const supabase = createClient(finalUrl, finalKey);
