'use server';

import { supabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

export async function getMessages() {
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching messages:', error);
    return [];
  }
  return data;
}

export async function addMessage(formData: { name: string; email: string; message: string; }) {
  const { error } = await supabase
    .from('messages')
    .insert([formData]);

  if (error) {
    return { success: false, error: error.message };
  }
  
  return { success: true };
}

export async function deleteMessage(id: number) {
  const { error } = await supabase
    .from('messages')
    .delete()
    .match({ id });

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath('/admin/dashboard');
  return { success: true };
}
