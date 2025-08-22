import type { NextApiRequest, NextApiResponse } from 'next';
import { getAuth } from '@clerk/nextjs/server';
import { supabase } from '../../lib/supabaseClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = getAuth(req);
  if (!userId) return res.status(401).json({ error: 'Unauthorized' });

  if (req.method === 'POST') {
    const { name, email } = req.body;

    if (!name) return res.status(400).json({ error: 'Guest name is required' });

    const { data, error } = await supabase
      .from('guests')
      .insert([{ name, email, user_id: userId }])
      .select()
      .single();

    if (error) return res.status(500).json({ error: error.message });

    return res.status(200).json(data);
  }

  if (req.method === 'GET') {
    const { data, error } = await supabase
      .from('guests')
      .select('*')
      .eq('user_id', userId);

    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json(data);
  }

  res.status(405).json({ error: 'Method not allowed' });
}
