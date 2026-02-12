'use server';

import { z } from 'zod';
import { supabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

const ContactFormSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
});

export async function submitContactForm(formData: { name: string; email: string; message: string }) {
  try {
    const parsedData = ContactFormSchema.parse(formData);

    const { error } = await supabase
      .from('messages')
      .insert([
        { 
          name: parsedData.name, 
          email: parsedData.email, 
          message: parsedData.message 
        },
      ]);

    if (error) {
      throw new Error(error.message);
    }

    revalidatePath('/admin/dashboard');
    return { success: true };
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : 'An unexpected error occurred.';
    return { success: false, error: errorMessage };
  }
}

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
