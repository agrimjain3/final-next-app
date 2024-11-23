// lib/supabase.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL; // Get this from your Supabase dashboard
const supabaseKey = process.env.SUPABASE_ANON_KEY; // Get this from your Supabase dashboard

export const supabase = createClient(supabaseUrl, supabaseKey);

