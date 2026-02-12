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

// Certification Actions
export async function getCertifications() {
  const { data, error } = await supabase
    .from('certifications')
    .select('*')
    .order('date', { ascending: false });

  if (error) {
    console.error('Error fetching certifications:', error);
    if (error.code === '42P01') return [];
    return [];
  }
  return data;
}

export async function addCertification(cert: any) {
  const { data, error } = await supabase.from('certifications').insert([cert]).select().single();
  if (error) return { success: false, error: error.message };
  revalidatePath('/'); revalidatePath('/admin');
  return { success: true, data };
}

export async function updateCertification(id: string, cert: any) {
  const { data, error } = await supabase.from('certifications').update(cert).match({ id }).select().single();
  if (error) return { success: false, error: error.message };
  revalidatePath('/'); revalidatePath('/admin');
  return { success: true, data };
}

export async function deleteCertification(id: string) {
  const { error } = await supabase.from('certifications').delete().match({ id });
  if (error) return { success: false, error: error.message };
  revalidatePath('/'); revalidatePath('/admin');
  return { success: true };
}


// Skill Categories Actions
export async function getSkillCategories() {
  const { data, error } = await supabase
    .from('skill_categories')
    .select('*, skills(*)')
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching skill categories:', error);
    if (error.code === '42P01') return [];
    return [];
  }
  return data;
}

export async function addSkillCategory(category: any) {
  const { data, error } = await supabase.from('skill_categories').insert([category]).select().single();
  if (error) return { success: false, error: error.message };
  revalidatePath('/'); revalidatePath('/admin');
  return { success: true, data };
}

export async function updateSkillCategory(id: string, category: any) {
  const { data, error } = await supabase.from('skill_categories').update(category).match({ id }).select().single();
  if (error) return { success: false, error: error.message };
  revalidatePath('/'); revalidatePath('/admin');
  return { success: true, data };
}

export async function deleteSkillCategory(id: string) {
  const { error } = await supabase.from('skill_categories').delete().match({ id });
  if (error) return { success: false, error: error.message };
  revalidatePath('/'); revalidatePath('/admin');
  return { success: true };
}


// Skills Actions
export async function getSkills() {
    const { data, error } = await supabase.from('skills').select('*').order('name', { ascending: true });
    if (error) {
        console.error('Error fetching skills:', error);
        if (error.code === '42P01') return [];
        return [];
    }
    return data;
}

export async function addSkill(skill: any) {
  const { data, error } = await supabase.from('skills').insert([skill]).select().single();
  if (error) return { success: false, error: error.message };
  revalidatePath('/'); revalidatePath('/admin');
  return { success: true, data };
}

export async function updateSkill(id: string, skill: any) {
  const { data, error } = await supabase.from('skills').update(skill).match({ id }).select().single();
  if (error) return { success: false, error: error.message };
  revalidatePath('/'); revalidatePath('/admin');
  return { success: true, data };
}

export async function deleteSkill(id: string) {
  const { error } = await supabase.from('skills').delete().match({ id });
  if (error) return { success: false, error: error.message };
  revalidatePath('/'); revalidatePath('/admin');
  return { success: true };
}