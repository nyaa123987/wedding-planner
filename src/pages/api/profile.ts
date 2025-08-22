import type { NextApiRequest, NextApiResponse } from 'next';
import { getAuth } from '@clerk/nextjs/server';
import { supabase } from '../../lib/supabaseClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { data, error } = await supabase
      .from('user_profiles')
      .select('wedding_date')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ error: 'Failed to fetch profile' });
    }

    return res.status(200).json({ wedding_date: data.wedding_date });
  } catch (err) {
    console.error('API error:', err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
}
