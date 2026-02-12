'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { getMessages, deleteMessage, getProjects, addProject, updateProject, deleteProject } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { Trash2, Inbox, Briefcase, Plus, Edit } from 'lucide-react';
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

type Message = {
  id: number;
  created_at: string;
  name: string;
  email: string;
  message: string;
};

type Project = {
  id: string;
  created_at: string;
  title: string;
  description: string;
  techStack: string[];
  githubUrl: string | null;
  liveDemoUrl: string | null;
  imageUrl: string | null;
  imageHint: string | null;
};

const projectFormSchema = z.object({
  title: z.string().min(2, { message: 'Title must be at least 2 characters.' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters.' }),
  techStack: z.string().min(1, { message: 'Please enter at least one technology.' }),
  githubUrl: z.string().url().optional().or(z.literal('')),
  liveDemoUrl: z.string().url().optional().or(z.literal('')),
  imageUrl: z.string().url().optional().or(z.literal('')),
  imageHint: z.string().optional(),
});


export default function AdminPage() {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isProjectDialogOpen, setIsProjectDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const form = useForm<z.infer<typeof projectFormSchema>>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      title: '',
      description: '',
      techStack: '',
      githubUrl: '',
      liveDemoUrl: '',
      imageUrl: '',
      imageHint: '',
    },
  });

  useEffect(() => {
    getMessages().then(setMessages);
    getProjects().then(setProjects);
  }, []);

  const handleDeleteMessage = async (id: number) => {
    const result = await deleteMessage(id);
    if (result.success) {
      setMessages(messages.filter(msg => msg.id !== id));
      toast({ title: 'Message deleted.' });
    } else {
      toast({ variant: 'destructive', title: 'Failed to delete message.', description: result.error });
    }
  };

  const handleOpenProjectDialog = (project: Project | null) => {
    setEditingProject(project);
    if (project) {
      form.reset({
        ...project,
        techStack: project.techStack.join(', '),
      });
    } else {
      form.reset({
        title: '',
        description: '',
        techStack: '',
        githubUrl: '',
        liveDemoUrl: '',
        imageUrl: '',
        imageHint: '',
      });
    }
    setIsProjectDialogOpen(true);
  };
  
  const handleProjectSubmit = async (values: z.infer<typeof projectFormSchema>) => {
    const projectData = {
      ...values,
      techStack: values.techStack.split(',').map(s => s.trim()).filter(Boolean),
    };

    let result;
    if (editingProject) {
      result = await updateProject(editingProject.id, projectData);
    } else {
      result = await addProject({ ...projectData, id: `project-${Date.now()}` });
    }

    if (result.success) {
      toast({ title: `Project ${editingProject ? 'updated' : 'added'}.` });
      getProjects().then(setProjects);
      setIsProjectDialogOpen(false);
    } else {
      toast({ variant: 'destructive', title: 'Something went wrong.', description: result.error });
    }
  };

  const handleDeleteProject = async (id: string) => {
    const result = await deleteProject(id);
    if (result.success) {
      setProjects(projects.filter(p => p.id !== id));
      toast({ title: 'Project deleted.' });
    } else {
      toast({ variant: 'destructive', title: 'Failed to delete project.', description: result.error });
    }
  };

  return (
    <div className="min-h-screen bg-muted/40 p-4 md:p-8">
      <div className="max-w-7xl mx-auto grid gap-8">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="font-headline text-3xl font-bold">Admin Panel</h1>
            <p className="text-foreground/80">Manage your portfolio content.</p>
          </div>
        </header>

        <Card className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2 font-headline text-2xl">
                    <Briefcase/> Projects
                </CardTitle>
                <CardDescription>
                  Add, edit, or delete your projects.
                </CardDescription>
              </div>
              <Button onClick={() => handleOpenProjectDialog(null)}>
                <Plus className="mr-2 h-4 w-4" /> Add Project
              </Button>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[40vh]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {projects.length > 0 ? projects.map((project) => (
                      <TableRow key={project.id}>
                        <TableCell className="font-medium">{project.title}</TableCell>
                        <TableCell className="max-w-sm truncate">{project.description}</TableCell>
                        <TableCell className="text-right">
                           <Button variant="ghost" size="icon" onClick={() => handleOpenProjectDialog(project)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. This will permanently delete the project.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDeleteProject(project.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </TableCell>
                      </TableRow>
                    )) : (
                      <TableRow>
                        <TableCell colSpan={3} className="h-24 text-center">
                          No projects yet.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline text-2xl">
                <Inbox/> Contact Messages
            </CardTitle>
            <CardDescription>
              Here are the messages submitted through your contact form.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[60vh]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Received</TableHead>
                    <TableHead>From</TableHead>
                    <TableHead>Message</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {messages.length > 0 ? messages.map((msg) => (
                    <TableRow key={msg.id}>
                      <TableCell className="w-[180px]">
                        {new Date(msg.created_at).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{msg.name}</div>
                        <div className="text-sm text-foreground/70">{msg.email}</div>
                      </TableCell>
                      <TableCell>
                        <p className="max-w-md truncate">{msg.message}</p>
                      </TableCell>
                      <TableCell className="text-right">
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the message.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDeleteMessage(msg.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </TableCell>
                    </TableRow>
                  )) : (
                    <TableRow>
                      <TableCell colSpan={4} className="h-24 text-center">
                        No messages yet.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

       <Dialog open={isProjectDialogOpen} onOpenChange={setIsProjectDialogOpen}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>{editingProject ? 'Edit Project' : 'Add New Project'}</DialogTitle>
            <DialogDescription>
              Fill in the details for your project. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleProjectSubmit)} className="space-y-4">
              <FormField control={form.control} name="title" render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl><Input placeholder="Project Title" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="description" render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl><Textarea placeholder="Project description..." {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="techStack" render={({ field }) => (
                <FormItem>
                  <FormLabel>Tech Stack (comma-separated)</FormLabel>
                  <FormControl><Input placeholder="React, Next.js, Tailwind CSS" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="githubUrl" render={({ field }) => (
                <FormItem>
                  <FormLabel>GitHub URL</FormLabel>
                  <FormControl><Input placeholder="https://github.com/..." {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="liveDemoUrl" render={({ field }) => (
                <FormItem>
                  <FormLabel>Live Demo URL</FormLabel>
                  <FormControl><Input placeholder="https://my-project.com" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="imageUrl" render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL</FormLabel>
                  <FormControl><Input placeholder="https://my-image.com/..." {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
               <FormField control={form.control} name="imageHint" render={({ field }) => (
                <FormItem>
                  <FormLabel>Image Hint</FormLabel>
                  <FormControl><Input placeholder="e.g., 'cybersecurity website'" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="secondary">Cancel</Button>
                </DialogClose>
                <Button type="submit" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? 'Saving...' : 'Save Project'}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
