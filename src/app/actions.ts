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

  revalidatePath('/admin');
  return { success: true };
}

// Project Actions
export async function getProjects() {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching projects:', error);
    // This is a placeholder for when the table doesn't exist yet
    // In a real scenario, you'd handle this more gracefully
    if (error.code === '42P01') {
      console.log("Projects table not found. Returning empty array.");
      return [];
    }
    return [];
  }
  return data;
}

export async function addProject(project: any) {
  const { data, error } = await supabase
    .from('projects')
    .insert([project])
    .select()
    .single();

  if (error) {
    return { success: false, error: error.message };
  }
  
  revalidatePath('/');
  revalidatePath('/admin');
  return { success: true, data };
}

export async function updateProject(id: string, project: any) {
    const { data, error } = await supabase
    .from('projects')
    .update(project)
    .match({ id })
    .select()
    .single();

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath('/');
  revalidatePath('/admin');
  return { success: true, data };
}


export async function deleteProject(id: string) {
  const { error } = await supabase
    .from('projects')
    .delete()
    .match({ id });

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath('/');
  revalidatePath('/admin');
  return { success: true };
}
