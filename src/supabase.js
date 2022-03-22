import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kjqdbdmnpdeoqzresjom.supabase.co'
const supabasePass = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtqcWRiZG1ucGRlb3F6cmVzam9tIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY0Nzg3MDg0OCwiZXhwIjoxOTYzNDQ2ODQ4fQ.u_ST20XEIph46vmoJaq5Qp-sGdc99TOVIcv809lYQJ4'


export const supabase = createClient(supabaseUrl, supabasePass);
