import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gykdvmqlxqscoitvwqvo.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd5a2R2bXFseHFzY29pdHZ3cXZvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI3MzM2NjcsImV4cCI6MjA2ODMwOTY2N30.XIz7E485oNI9obcIHQHi_Wfu0Dp_t7u9u74PYSWwbT0';  // ← also from your Supabase dashboard

export const supabase = createClient(supabaseUrl, supabaseKey);