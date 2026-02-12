'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Send, Mail, Smartphone } from 'lucide-react';
import { submitContactForm } from '@/app/actions';
import { contactInfo, socialLinks } from '@/lib/data';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

export default function ContactSection() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const result = await submitContactForm(values);
      if (result.success) {
        toast({
          title: 'Message Sent!',
          description: "Thanks for reaching out. I'll get back to you soon.",
        });
        form.reset();
      } else {
        throw new Error(result.error || 'An unknown error occurred.');
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: error instanceof Error ? error.message : 'There was a problem with your request.',
      });
    }
  }

  return (
    <section id="contact" className="w-full bg-muted/20 py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-4">
          <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Get in Touch
          </h2>
          <p className="max-w-[900px] text-foreground/80 md:text-xl/relaxed">
            Have a question or want to work together? Drop me a message or reach out directly.
          </p>
        </div>
        <div className="mt-12 max-w-5xl mx-auto grid lg:grid-cols-2 gap-12 items-start">
          <Card className="glass-card h-full">
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Send a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="your.email@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Your message here..." {...field} rows={5} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? 'Sending...' : 'Send Message'}
                    <Send className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          <div className="space-y-8">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="font-headline text-2xl">Contact Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <a href={`mailto:${contactInfo.email}`} className="flex items-center gap-4 text-lg hover:text-primary transition-colors">
                  <Mail className="h-6 w-6 text-primary" />
                  <span>{contactInfo.email}</span>
                </a>
                <a href={`tel:${contactInfo.phone}`} className="flex items-center gap-4 text-lg hover:text-primary transition-colors">
                  <Smartphone className="h-6 w-6 text-primary" />
                  <span>{contactInfo.phone}</span>
                </a>
              </CardContent>
            </Card>
            
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="font-headline text-2xl">Find me on</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-4">
                {socialLinks.map((link) => (
                    <Button key={link.name} variant="outline" size="lg" asChild>
                      <a href={link.url} target="_blank" rel="noopener noreferrer">
                        <link.icon className="mr-2 h-5 w-5" />
                        {link.name}
                      </a>
                    </Button>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
