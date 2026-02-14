'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  getMessages, deleteMessage, getProjects, addProject, updateProject, deleteProject,
  getCertifications, addCertification, updateCertification, deleteCertification,
  getSkillCategories, addSkillCategory, updateSkillCategory, deleteSkillCategory,
  getSkills, addSkill, updateSkill, deleteSkill,
  getSupabaseConfigStatus,
  getSettings,
  updateSettings
} from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { Trash2, Inbox, Briefcase, Plus, Edit, Award, Cpu, TriangleAlert, Cog } from 'lucide-react';
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription as FormDescriptionComponent } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LogoutButton } from '@/components/ui/logout-button';
import '@/components/ui/logout-button.css';


// Data Types
type Message = { id: number; created_at: string; name: string; email: string; message: string; };
type Project = { id: string; created_at: string; title: string; description: string; techStack: string[]; githubUrl: string | null; liveDemoUrl: string | null; imageUrl: string | null; imageHint: string | null; };
type Certification = { id: string; created_at: string; title: string; issuer: string; date: string; description: string; };
type SkillCategory = { id: string; created_at: string; title: string; icon: string; skills: Skill[] };
type Skill = { id: string; created_at: string; name: string; level: number; category_id: string; };
type Settings = { [key: string]: string };

// Form Schemas
const projectFormSchema = z.object({
  title: z.string().min(2), description: z.string().min(10), techStack: z.string().min(1),
  githubUrl: z.string().url().optional().or(z.literal('')), liveDemoUrl: z.string().url().optional().or(z.literal('')),
  imageUrl: z.string().url().optional().or(z.literal('')), imageHint: z.string().optional(),
});
const certificationFormSchema = z.object({
  title: z.string().min(2), issuer: z.string().min(2), date: z.string().min(4), description: z.string().min(10),
});
const skillCategoryFormSchema = z.object({ title: z.string().min(2), icon: z.string().min(2) });
const skillFormSchema = z.object({
  name: z.string().min(1), level: z.preprocess((a) => parseInt(z.string().parse(a), 10), z.number().min(0).max(100)),
  category_id: z.string(),
});
const settingsFormSchema = z.object({
  name: z.string().min(2, "Name is required."),
  tagline: z.string().min(2, "Tagline is required."),
  about_intro: z.string().min(10, "About intro must be at least 10 characters."),
  contact_email: z.string().email("Please enter a valid email."),
  contact_phone: z.string().min(2, "Phone number is required."),
  resume_url: z.string().url("Please enter a valid URL.").or(z.literal('')),
});

export default function AdminPage() {
  const { toast } = useToast();
  // State
  const [isConfigured, setIsConfigured] = useState<boolean | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [skillCategories, setSkillCategories] = useState<SkillCategory[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [settings, setSettings] = useState<Settings>({});

  // Dialog states
  const [isProjectDialogOpen, setIsProjectDialogOpen] = useState(false);
  const [isCertDialogOpen, setIsCertDialogOpen] = useState(false);
  const [isSkillCatDialogOpen, setIsSkillCatDialogOpen] = useState(false);
  const [isSkillDialogOpen, setIsSkillDialogOpen] = useState(false);

  // Editing states
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingCert, setEditingCert] = useState<Certification | null>(null);
  const [editingSkillCat, setEditingSkillCat] = useState<SkillCategory | null>(null);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);

  // Forms
  const projectForm = useForm<z.infer<typeof projectFormSchema>>({ resolver: zodResolver(projectFormSchema), defaultValues: { title: '', description: '', techStack: '', githubUrl: '', liveDemoUrl: '', imageUrl: '', imageHint: '' } });
  const certForm = useForm<z.infer<typeof certificationFormSchema>>({ resolver: zodResolver(certificationFormSchema), defaultValues: { title: '', issuer: '', date: '', description: '' } });
  const skillCatForm = useForm<z.infer<typeof skillCategoryFormSchema>>({ resolver: zodResolver(skillCategoryFormSchema), defaultValues: { title: '', icon: '' } });
  const skillForm = useForm<z.infer<typeof skillFormSchema>>({ resolver: zodResolver(skillFormSchema), defaultValues: { name: '', level: 80, category_id: '' } });
  const settingsForm = useForm<z.infer<typeof settingsFormSchema>>({
    resolver: zodResolver(settingsFormSchema),
    defaultValues: { name: '', tagline: '', about_intro: '', contact_email: '', contact_phone: '', resume_url: '' },
  });
  
  const fetchData = () => {
    getMessages().then(setMessages);
    getProjects().then(setProjects);
    getCertifications().then(setCertifications);
    getSkillCategories().then(setSkillCategories);
    getSkills().then(setSkills);
    getSettings().then(s => {
      setSettings(s);
      settingsForm.reset(s);
    });
  };

  useEffect(() => {
    getSupabaseConfigStatus().then(status => {
      setIsConfigured(status);
      if (status) {
        fetchData();
      }
    });
  }, []);
  
  // Generic delete handler
  const handleDelete = async (id: string | number, deleteFn: (id: any) => Promise<any>, type: string) => {
    const result = await deleteFn(id);
    if (result.success) {
      toast({ title: `${type} deleted.` });
      fetchData();
    } else {
      toast({ variant: 'destructive', title: `Failed to delete ${type}.`, description: result.error });
    }
  };
  
  // --- Site Settings ---
  const onSettingsSubmit = async (values: z.infer<typeof settingsFormSchema>) => {
    const settingsToUpdate = Object.entries(values).map(([key, value]) => ({ key, value: value || '' }));
    const result = await updateSettings(settingsToUpdate);
    if (result.success) {
      toast({ title: 'Settings updated.' });
      fetchData();
    } else {
      toast({ variant: 'destructive', title: 'Something went wrong.', description: result.error });
    }
  };

  // --- Projects ---
  const handleOpenProjectDialog = (project: Project | null) => {
    setEditingProject(project);
    projectForm.reset(project ? { ...project, techStack: project.techStack.join(', ') } : { title: '', description: '', techStack: '', githubUrl: '', liveDemoUrl: '', imageUrl: '', imageHint: '' });
    setIsProjectDialogOpen(true);
  };
  const onProjectSubmit = async (values: z.infer<typeof projectFormSchema>) => {
    const projectData = { ...values, techStack: values.techStack.split(',').map(s => s.trim()).filter(Boolean) };
    const result = await (editingProject ? updateProject(editingProject.id, projectData) : addProject({ ...projectData, id: `project-${Date.now()}` }));
    if (result.success) {
      toast({ title: `Project ${editingProject ? 'updated' : 'added'}.` });
      fetchData();
      setIsProjectDialogOpen(false);
    } else {
      toast({ variant: 'destructive', title: 'Something went wrong.', description: result.error });
    }
  };

  // --- Certifications ---
  const handleOpenCertDialog = (cert: Certification | null) => {
    setEditingCert(cert);
    certForm.reset(cert || { title: '', issuer: '', date: '', description: '' });
    setIsCertDialogOpen(true);
  };
  const onCertSubmit = async (values: z.infer<typeof certificationFormSchema>) => {
    const result = await (editingCert ? updateCertification(editingCert.id, values) : addCertification({ ...values, id: `cert-${Date.now()}` }));
    if (result.success) {
      toast({ title: `Certification ${editingCert ? 'updated' : 'added'}.` });
      fetchData();
      setIsCertDialogOpen(false);
    } else {
      toast({ variant: 'destructive', title: 'Something went wrong.', description: result.error });
    }
  };
  
  // --- Skill Categories ---
  const handleOpenSkillCatDialog = (cat: SkillCategory | null) => {
    setEditingSkillCat(cat);
    skillCatForm.reset(cat || { title: '', icon: '' });
    setIsSkillCatDialogOpen(true);
  };
  const onSkillCatSubmit = async (values: z.infer<typeof skillCategoryFormSchema>) => {
    const result = await (editingSkillCat ? updateSkillCategory(editingSkillCat.id, values) : addSkillCategory({ ...values, id: `skillcat-${Date.now()}` }));
    if (result.success) {
      toast({ title: `Category ${editingSkillCat ? 'updated' : 'added'}.` });
      fetchData();
      setIsSkillCatDialogOpen(false);
    } else {
      toast({ variant: 'destructive', title: 'Something went wrong.', description: result.error });
    }
  };

  // --- Skills ---
  const handleOpenSkillDialog = (skill: Skill | null) => {
    setEditingSkill(skill);
    skillForm.reset(skill || { name: '', level: 80, category_id: '' });
    setIsSkillDialogOpen(true);
  };
  const onSkillSubmit = async (values: z.infer<typeof skillFormSchema>) => {
    const result = await (editingSkill ? updateSkill(editingSkill.id, values) : addSkill({ ...values, id: `skill-${Date.now()}` }));
    if (result.success) {
      toast({ title: `Skill ${editingSkill ? 'updated' : 'added'}.` });
      fetchData();
      setIsSkillDialogOpen(false);
    } else {
      toast({ variant: 'destructive', title: 'Something went wrong.', description: result.error });
    }
  };

  if (isConfigured === null) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
          <p>Loading configuration...</p>
      </div>
    );
  }

  if (!isConfigured) {
    return (
        <div className="min-h-screen bg-muted/40 p-4 md:p-8">
            <div className="max-w-3xl mx-auto">
                <Card className="border-destructive">
                    <CardHeader>
                        <CardTitle className="text-destructive flex items-center gap-2">
                            <TriangleAlert className="h-6 w-6"/> Configuration Needed
                        </CardTitle>
                        <CardDescription>
                            Your Supabase credentials are not configured correctly.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="mb-4">To use the admin panel, you need to connect to your Supabase project. Please add your project URL and service role key to the <code>.env.local</code> file, then restart the development server.</p>
                        <div className="font-mono bg-muted p-4 rounded-md text-sm">
                            <p>NEXT_PUBLIC_SUPABASE_URL="YOUR_SUPABASE_URL"</p>
                            <p>SUPABASE_SERVICE_ROLE_KEY="YOUR_SUPABASE_SERVICE_ROLE_KEY"</p>
                        </div>
                        <p className="mt-4 text-sm text-muted-foreground">You can find these keys in your Supabase project settings under the "API" section.</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
  }

  return (
    <div className="min-h-screen bg-muted/40 p-4 md:p-8">
      <div className="mx-auto max-w-7xl grid gap-8">
        <header className="flex items-start justify-between">
          <div>
            <h1 className="font-headline text-2xl font-bold md:text-3xl">Admin Panel</h1>
            <p className="text-foreground/80">Manage your portfolio content.</p>
          </div>
          <LogoutButton />
        </header>

        {/* Site Settings Card */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline text-2xl"><Cog/> Site Settings</CardTitle>
            <CardDescription>Manage general site content like your name, bio, and contact info.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...settingsForm}>
              <form onSubmit={settingsForm.handleSubmit(onSettingsSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField control={settingsForm.control} name="name" render={({ field }) => (<FormItem><FormLabel>Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={settingsForm.control} name="tagline" render={({ field }) => (<FormItem><FormLabel>Tagline</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                </div>
                <FormField control={settingsForm.control} name="about_intro" render={({ field }) => (<FormItem><FormLabel>About Intro</FormLabel><FormControl><Textarea {...field} rows={5} /></FormControl><FormMessage /></FormItem>)} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField control={settingsForm.control} name="contact_email" render={({ field }) => (<FormItem><FormLabel>Contact Email</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={settingsForm.control} name="contact_phone" render={({ field }) => (<FormItem><FormLabel>Contact Phone</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                </div>
                <FormField control={settingsForm.control} name="resume_url" render={({ field }) => (<FormItem><FormLabel>Resume URL</FormLabel><FormControl><Input placeholder="https://example.com/resume.pdf" {...field} /></FormControl><FormDescriptionComponent>Host your PDF file at a public URL and paste it here.</FormDescriptionComponent><FormMessage /></FormItem>)} />
                <div className="flex justify-end">
                  <Button type="submit" disabled={settingsForm.formState.isSubmitting}>
                    {settingsForm.formState.isSubmitting ? 'Saving...' : 'Save Settings'}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>


        {/* Projects Card */}
        <Card className="glass-card">
          <CardHeader className="flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 font-headline text-2xl"><Briefcase/> Projects</CardTitle>
              <CardDescription>Add, edit, or delete your projects.</CardDescription>
            </div>
            <Button onClick={() => handleOpenProjectDialog(null)}><Plus className="mr-2 h-4 w-4" /> Add Project</Button>
          </CardHeader>
          <CardContent><ScrollArea className="h-[30vh]"><Table>
            <TableHeader><TableRow><TableHead>Title</TableHead><TableHead className="hidden md:table-cell">Description</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
            <TableBody>{projects.length > 0 ? projects.map((p) => (
              <TableRow key={p.id}><TableCell className="font-medium">{p.title}</TableCell><TableCell className="hidden max-w-sm truncate md:table-cell">{p.description}</TableCell><TableCell className="text-right">
                <Button variant="ghost" size="icon" onClick={() => handleOpenProjectDialog(p)}><Edit className="h-4 w-4" /></Button>
                <AlertDialog><AlertDialogTrigger asChild><Button variant="ghost" size="icon"><Trash2 className="h-4 w-4 text-destructive" /></Button></AlertDialogTrigger>
                  <AlertDialogContent><AlertDialogHeader><AlertDialogTitle>Are you sure?</AlertDialogTitle><AlertDialogDescription>This will permanently delete the project.</AlertDialogDescription></AlertDialogHeader>
                    <AlertDialogFooter><AlertDialogCancel>Cancel</AlertDialogCancel><AlertDialogAction onClick={() => handleDelete(p.id, deleteProject, 'Project')} className="bg-destructive hover:bg-destructive/90">Delete</AlertDialogAction></AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell></TableRow>)) : <TableRow><TableCell colSpan={3} className="h-24 text-center">No projects yet.</TableCell></TableRow>}
            </TableBody>
          </Table></ScrollArea></CardContent>
        </Card>

        {/* Certifications Card */}
        <Card className="glass-card">
          <CardHeader className="flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 font-headline text-2xl"><Award/> Certifications</CardTitle>
              <CardDescription>Manage your certifications and achievements.</CardDescription>
            </div>
            <Button onClick={() => handleOpenCertDialog(null)}><Plus className="mr-2 h-4 w-4" /> Add Certification</Button>
          </CardHeader>
          <CardContent><ScrollArea className="h-[30vh]"><Table>
            <TableHeader><TableRow><TableHead>Title</TableHead><TableHead className="hidden md:table-cell">Issuer</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
            <TableBody>{certifications.length > 0 ? certifications.map((c) => (
              <TableRow key={c.id}><TableCell className="font-medium">{c.title}</TableCell><TableCell className="hidden md:table-cell">{c.issuer}</TableCell><TableCell className="text-right">
                <Button variant="ghost" size="icon" onClick={() => handleOpenCertDialog(c)}><Edit className="h-4 w-4" /></Button>
                <AlertDialog><AlertDialogTrigger asChild><Button variant="ghost" size="icon"><Trash2 className="h-4 w-4 text-destructive" /></Button></AlertDialogTrigger>
                  <AlertDialogContent><AlertDialogHeader><AlertDialogTitle>Are you sure?</AlertDialogTitle><AlertDialogDescription>This will permanently delete this certification.</AlertDialogDescription></AlertDialogHeader>
                    <AlertDialogFooter><AlertDialogCancel>Cancel</AlertDialogCancel><AlertDialogAction onClick={() => handleDelete(c.id, deleteCertification, 'Certification')} className="bg-destructive hover:bg-destructive/90">Delete</AlertDialogAction></AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell></TableRow>)) : <TableRow><TableCell colSpan={3} className="h-24 text-center">No certifications yet.</TableCell></TableRow>}
            </TableBody>
          </Table></ScrollArea></CardContent>
        </Card>
        
        {/* Skills Management Card */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline text-2xl"><Cpu/> Skills</CardTitle>
            <CardDescription>Manage your skill categories and individual skills.</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="categories">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="categories">Skill Categories</TabsTrigger>
                <TabsTrigger value="skills">Skills</TabsTrigger>
              </TabsList>
              <TabsContent value="categories">
                <div className="flex justify-end mb-4"><Button onClick={() => handleOpenSkillCatDialog(null)}><Plus className="mr-2 h-4 w-4" /> Add Category</Button></div>
                <ScrollArea className="h-[30vh]"><Table>
                  <TableHeader><TableRow><TableHead>Title</TableHead><TableHead className="hidden md:table-cell">Icon</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
                  <TableBody>{skillCategories.map(cat => (
                    <TableRow key={cat.id}><TableCell>{cat.title}</TableCell><TableCell className="hidden md:table-cell">{cat.icon}</TableCell><TableCell className="text-right">
                      <Button variant="ghost" size="icon" onClick={() => handleOpenSkillCatDialog(cat)}><Edit className="h-4 w-4" /></Button>
                      <AlertDialog><AlertDialogTrigger asChild><Button variant="ghost" size="icon"><Trash2 className="h-4 w-4 text-destructive" /></Button></AlertDialogTrigger>
                        <AlertDialogContent><AlertDialogHeader><AlertDialogTitle>Are you sure?</AlertDialogTitle><AlertDialogDescription>Deleting a category will also delete all skills within it.</AlertDialogDescription></AlertDialogHeader>
                          <AlertDialogFooter><AlertDialogCancel>Cancel</AlertDialogCancel><AlertDialogAction onClick={() => handleDelete(cat.id, deleteSkillCategory, 'Skill Category')} className="bg-destructive hover:bg-destructive/90">Delete</AlertDialogAction></AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell></TableRow>
                  ))}</TableBody>
                </Table></ScrollArea>
              </TabsContent>
              <TabsContent value="skills">
                <div className="flex justify-end mb-4"><Button onClick={() => handleOpenSkillDialog(null)} disabled={skillCategories.length === 0}><Plus className="mr-2 h-4 w-4" /> Add Skill</Button></div>
                 <ScrollArea className="h-[30vh]"><Table>
                  <TableHeader><TableRow><TableHead>Name</TableHead><TableHead>Level</TableHead><TableHead className="hidden md:table-cell">Category</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
                  <TableBody>{skills.map(skill => {
                      const category = skillCategories.find(c => c.id === skill.category_id);
                      return (
                        <TableRow key={skill.id}><TableCell>{skill.name}</TableCell><TableCell>{skill.level}%</TableCell><TableCell className="hidden md:table-cell">{category?.title || 'N/A'}</TableCell><TableCell className="text-right">
                          <Button variant="ghost" size="icon" onClick={() => handleOpenSkillDialog(skill)}><Edit className="h-4 w-4" /></Button>
                          <AlertDialog><AlertDialogTrigger asChild><Button variant="ghost" size="icon"><Trash2 className="h-4 w-4 text-destructive" /></Button></AlertDialogTrigger>
                            <AlertDialogContent><AlertDialogHeader><AlertDialogTitle>Are you sure?</AlertDialogTitle><AlertDialogDescription>This will permanently delete this skill.</AlertDialogDescription></AlertDialogHeader>
                              <AlertDialogFooter><AlertDialogCancel>Cancel</AlertDialogCancel><AlertDialogAction onClick={() => handleDelete(skill.id, deleteSkill, 'Skill')} className="bg-destructive hover:bg-destructive/90">Delete</AlertDialogAction></AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </TableCell></TableRow>
                      )
                    })}</TableBody>
                </Table></ScrollArea>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Messages Card */}
        <Card className="glass-card">
          <CardHeader><CardTitle className="flex items-center gap-2 font-headline text-2xl"><Inbox/> Contact Messages</CardTitle><CardDescription>Here are the messages from your contact form.</CardDescription></CardHeader>
          <CardContent><ScrollArea className="h-[40vh]"><Table>
            <TableHeader><TableRow><TableHead>Received</TableHead><TableHead>From</TableHead><TableHead>Message</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
            <TableBody>{messages.length > 0 ? messages.map((msg) => (
              <TableRow key={msg.id}><TableCell className="whitespace-nowrap">{new Date(msg.created_at).toLocaleString()}</TableCell><TableCell><div className="font-medium">{msg.name}</div><div className="text-sm text-foreground/70">{msg.email}</div></TableCell><TableCell><p className="max-w-xs md:max-w-md truncate">{msg.message}</p></TableCell><TableCell className="text-right">
                <AlertDialog><AlertDialogTrigger asChild><Button variant="ghost" size="icon"><Trash2 className="h-4 w-4 text-destructive" /></Button></AlertDialogTrigger>
                  <AlertDialogContent><AlertDialogHeader><AlertDialogTitle>Are you sure?</AlertDialogTitle><AlertDialogDescription>This will permanently delete the message.</AlertDialogDescription></AlertDialogHeader>
                    <AlertDialogFooter><AlertDialogCancel>Cancel</AlertDialogCancel><AlertDialogAction onClick={() => handleDelete(msg.id, deleteMessage, 'Message')} className="bg-destructive hover:bg-destructive/90">Delete</AlertDialogAction></AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell></TableRow>)) : <TableRow><TableCell colSpan={4} className="h-24 text-center">No messages yet.</TableCell></TableRow>}
            </TableBody>
          </Table></ScrollArea></CardContent>
        </Card>
      </div>

      {/* Dialogs */}
      <Dialog open={isProjectDialogOpen} onOpenChange={setIsProjectDialogOpen}><DialogContent className="sm:max-w-[625px]">
        <DialogHeader><DialogTitle>{editingProject ? 'Edit' : 'Add'} Project</DialogTitle></DialogHeader>
        <Form {...projectForm}><form onSubmit={projectForm.handleSubmit(onProjectSubmit)} className="space-y-4">
            <FormField control={projectForm.control} name="title" render={({ field }) => (<FormItem><FormLabel>Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
            <FormField control={projectForm.control} name="description" render={({ field }) => (<FormItem><FormLabel>Description</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>)} />
            <FormField control={projectForm.control} name="techStack" render={({ field }) => (<FormItem><FormLabel>Tech Stack (comma-separated)</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
            <FormField control={projectForm.control} name="githubUrl" render={({ field }) => (<FormItem><FormLabel>GitHub URL</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
            <FormField control={projectForm.control} name="liveDemoUrl" render={({ field }) => (<FormItem><FormLabel>Live Demo URL</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
            <FormField control={projectForm.control} name="imageUrl" render={({ field }) => (<FormItem><FormLabel>Image URL</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
            <FormField control={projectForm.control} name="imageHint" render={({ field }) => (<FormItem><FormLabel>Image Hint</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
            <DialogFooter><DialogClose asChild><Button type="button" variant="secondary">Cancel</Button></DialogClose><Button type="submit">Save</Button></DialogFooter>
        </form></Form>
      </DialogContent></Dialog>
      
      <Dialog open={isCertDialogOpen} onOpenChange={setIsCertDialogOpen}><DialogContent className="sm:max-w-[625px]">
        <DialogHeader><DialogTitle>{editingCert ? 'Edit' : 'Add'} Certification</DialogTitle></DialogHeader>
        <Form {...certForm}><form onSubmit={certForm.handleSubmit(onCertSubmit)} className="space-y-4">
            <FormField control={certForm.control} name="title" render={({ field }) => (<FormItem><FormLabel>Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
            <FormField control={certForm.control} name="issuer" render={({ field }) => (<FormItem><FormLabel>Issuer</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
            <FormField control={certForm.control} name="date" render={({ field }) => (<FormItem><FormLabel>Date</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
            <FormField control={certForm.control} name="description" render={({ field }) => (<FormItem><FormLabel>Description</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>)} />
            <DialogFooter><DialogClose asChild><Button type="button" variant="secondary">Cancel</Button></DialogClose><Button type="submit">Save</Button></DialogFooter>
        </form></Form>
      </DialogContent></Dialog>

      <Dialog open={isSkillCatDialogOpen} onOpenChange={setIsSkillCatDialogOpen}><DialogContent className="sm:max-w-[425px]">
        <DialogHeader><DialogTitle>{editingSkillCat ? 'Edit' : 'Add'} Skill Category</DialogTitle></DialogHeader>
        <Form {...skillCatForm}><form onSubmit={skillCatForm.handleSubmit(onSkillCatSubmit)} className="space-y-4">
            <FormField control={skillCatForm.control} name="title" render={({ field }) => (<FormItem><FormLabel>Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
            <FormField control={skillCatForm.control} name="icon" render={({ field }) => (<FormItem><FormLabel>Icon Name</FormLabel><FormControl><Input placeholder="e.g. Code, Globe" {...field} /></FormControl><FormMessage /></FormItem>)} />
            <DialogFooter><DialogClose asChild><Button type="button" variant="secondary">Cancel</Button></DialogClose><Button type="submit">Save</Button></DialogFooter>
        </form></Form>
      </DialogContent></Dialog>

      <Dialog open={isSkillDialogOpen} onOpenChange={setIsSkillDialogOpen}><DialogContent className="sm:max-w-[425px]">
        <DialogHeader><DialogTitle>{editingSkill ? 'Edit' : 'Add'} Skill</DialogTitle></DialogHeader>
        <Form {...skillForm}><form onSubmit={skillForm.handleSubmit(onSkillSubmit)} className="space-y-4">
            <FormField control={skillForm.control} name="name" render={({ field }) => (<FormItem><FormLabel>Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
            <FormField control={skillForm.control} name="level" render={({ field }) => (<FormItem><FormLabel>Proficiency Level (%)</FormLabel><FormControl><Input type="number" min="0" max="100" {...field} /></FormControl><FormMessage /></FormItem>)} />
            <FormField control={skillForm.control} name="category_id" render={({ field }) => (
              <FormItem><FormLabel>Category</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl><SelectTrigger><SelectValue placeholder="Select a category" /></SelectTrigger></FormControl>
                <SelectContent>{skillCategories.map(cat => <SelectItem key={cat.id} value={cat.id}>{cat.title}</SelectItem>)}</SelectContent>
              </Select><FormMessage />
              </FormItem>
            )} />
            <DialogFooter><DialogClose asChild><Button type="button" variant="secondary">Cancel</Button></DialogClose><Button type="submit">Save</Button></DialogFooter>
        </form></Form>
      </DialogContent></Dialog>
    </div>
  );
}
