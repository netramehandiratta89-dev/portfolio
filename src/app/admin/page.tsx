'use client';

import { useEffect, useState } from 'react';
import { getMessages, deleteMessage } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { Trash2, Inbox } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

type Message = {
  id: number;
  created_at: string;
  name: string;
  email: string;
  message: string;
};

export default function AdminPage() {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    getMessages().then(setMessages);
  }, []);

  const handleDelete = async (id: number) => {
    const result = await deleteMessage(id);
    if (result.success) {
      setMessages(messages.filter(msg => msg.id !== id));
      toast({ title: 'Message deleted.' });
    } else {
      toast({ variant: 'destructive', title: 'Failed to delete message.', description: result.error });
    }
  };

  return (
    <div className="min-h-screen bg-muted/40 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-headline text-3xl font-bold">Admin Panel</h1>
            <p className="text-foreground/80">Manage your portfolio content.</p>
          </div>
        </header>

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
                              <AlertDialogAction onClick={() => handleDelete(msg.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
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
    </div>
  );
}
