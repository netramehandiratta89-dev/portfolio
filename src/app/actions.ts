'use server';

import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

export async function getSupabaseConfigStatus() {
  return isSupabaseConfigured;
}

export async function getMessages() {
  if (!supabase) return [];
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
  if (!supabase) return { success: false, error: 'Supabase is not configured.' };
  const { error } = await supabase
    .from('messages')
    .insert([formData]);

  if (error) {
    return { success: false, error: error.message };
  }
  
  return { success: true };
}

export async function deleteMessage(id: number) {
  if (!supabase) return { success: false, error: 'Supabase is not configured.' };
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
  if (!supabase) return [];
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
  if (!supabase) return { success: false, error: 'Supabase is not configured.' };
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
    if (!supabase) return { success: false, error: 'Supabase is not configured.' };
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
  if (!supabase) return { success: false, error: 'Supabase is not configured.' };
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
  if (!supabase) return [];
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
  if (!supabase) return { success: false, error: 'Supabase is not configured.' };
  const { data, error } = await supabase.from('certifications').insert([cert]).select().single();
  if (error) return { success: false, error: error.message };
  revalidatePath('/'); revalidatePath('/admin');
  return { success: true, data };
}

export async function updateCertification(id: string, cert: any) {
  if (!supabase) return { success: false, error: 'Supabase is not configured.' };
  const { data, error } = await supabase.from('certifications').update(cert).match({ id }).select().single();
  if (error) return { success: false, error: error.message };
  revalidatePath('/'); revalidatePath('/admin');
  return { success: true, data };
}

export async function deleteCertification(id: string) {
  if (!supabase) return { success: false, error: 'Supabase is not configured.' };
  const { error } = await supabase.from('certifications').delete().match({ id });
  if (error) return { success: false, error: error.message };
  revalidatePath('/'); revalidatePath('/admin');
  return { success: true };
}

// Education Actions
export async function getEducation() {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('education')
    .select('*')
    .order('date_range', { ascending: false });

  if (error) {
    console.error('Error fetching education:', error);
    if (error.code === '42P01') return [];
    return [];
  }
  return data;
}

export async function addEducation(edu: any) {
  if (!supabase) return { success: false, error: 'Supabase is not configured.' };
  const { data, error } = await supabase.from('education').insert([edu]).select().single();
  if (error) return { success: false, error: error.message };
  revalidatePath('/'); revalidatePath('/admin');
  return { success: true, data };
}

export async function updateEducation(id: string, edu: any) {
  if (!supabase) return { success: false, error: 'Supabase is not configured.' };
  const { data, error } = await supabase.from('education').update(edu).match({ id }).select().single();
  if (error) return { success: false, error: error.message };
  revalidatePath('/'); revalidatePath('/admin');
  return { success: true, data };
}

export async function deleteEducation(id: string) {
  if (!supabase) return { success: false, error: 'Supabase is not configured.' };
  const { error } = await supabase.from('education').delete().match({ id });
  if (error) return { success: false, error: error.message };
  revalidatePath('/'); revalidatePath('/admin');
  return { success: true };
}


// Skill Categories Actions
export async function getSkillCategories() {
  if (!supabase) return [];
  
  const { data: categories, error: catError } = await supabase
    .from('skill_categories')
    .select('*')
    .order('created_at', { ascending: true });

  if (catError) {
    console.error('Error fetching skill categories:', catError);
    if (catError.code === '42P01') return [];
    return [];
  }
  
  const { data: skills, error: skillsError } = await supabase
    .from('skills')
    .select('*');

  if (skillsError) {
    console.error('Error fetching skills for categories:', skillsError);
    return categories.map(c => ({...c, skills: []}));
  }

  const categoriesWithSkills = categories.map(category => ({
    ...category,
    skills: skills.filter(skill => skill.category_id === category.id).sort((a,b) => b.level - a.level)
  }));

  return categoriesWithSkills;
}


export async function addSkillCategory(category: any) {
  if (!supabase) return { success: false, error: 'Supabase is not configured.' };
  const { data, error } = await supabase.from('skill_categories').insert([category]).select().single();
  if (error) return { success: false, error: error.message };
  revalidatePath('/'); revalidatePath('/admin');
  return { success: true, data };
}

export async function updateSkillCategory(id: string, category: any) {
  if (!supabase) return { success: false, error: 'Supabase is not configured.' };
  const { data, error } = await supabase.from('skill_categories').update(category).match({ id }).select().single();
  if (error) return { success: false, error: error.message };
  revalidatePath('/'); revalidatePath('/admin');
  return { success: true, data };
}

export async function deleteSkillCategory(id: string) {
  if (!supabase) return { success: false, error: 'Supabase is not configured.' };
  const { error } = await supabase.from('skill_categories').delete().match({ id });
  if (error) return { success: false, error: error.message };
  revalidatePath('/'); revalidatePath('/admin');
  return { success: true };
}


// Skills Actions
export async function getSkills() {
    if (!supabase) return [];
    const { data, error } = await supabase.from('skills').select('*').order('name', { ascending: true });
    if (error) {
        console.error('Error fetching skills:', error);
        if (error.code === '42P01') return [];
        return [];
    }
    return data;
}

export async function addSkill(skill: any) {
  if (!supabase) return { success: false, error: 'Supabase is not configured.' };
  const { data, error } = await supabase.from('skills').insert([skill]).select().single();
  if (error) return { success: false, error: error.message };
  revalidatePath('/'); revalidatePath('/admin');
  return { success: true, data };
}

export async function updateSkill(id: string, skill: any) {
  if (!supabase) return { success: false, error: 'Supabase is not configured.' };
  const { data, error } = await supabase.from('skills').update(skill).match({ id }).select().single();
  if (error) return { success: false, error: error.message };
  revalidatePath('/'); revalidatePath('/admin');
  return { success: true, data };
}

export async function deleteSkill(id: string) {
  if (!supabase) return { success: false, error: 'Supabase is not configured.' };
  const { error } = await supabase.from('skills').delete().match({ id });
  if (error) return { success: false, error: error.message };
  revalidatePath('/'); revalidatePath('/admin');
  return { success: true };
}

// Settings Actions
export async function getSettings() {
  if (!supabase) return {};
  const { data, error } = await supabase.from('settings').select('*');

  if (error) {
    console.error('Error fetching settings:', error);
    if (error.code === '42P01') return {}; // table doesn't exist
    return {};
  }
  
  // Convert array to key-value object
  const settings = data.reduce((acc, setting) => {
    acc[setting.key] = setting.value;
    return acc;
  }, {} as { [key: string]: string });

  return settings;
}

export async function updateSettings(settings: { key: string; value: string }[]) {
  if (!supabase) return { success: false, error: 'Supabase is not configured.' };
  
  const { error } = await supabase.from('settings').upsert(settings);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath('/');
  revalidatePath('/admin');
  return { success: true };
}
