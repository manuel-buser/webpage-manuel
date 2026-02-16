import { PageTransition } from '@/components/PageTransition';
import { ContactForm } from '@/components/ContactForm';
import { Mail, MapPin, Phone } from 'lucide-react';
import { personalInfo } from '@/data/cv-data';

export const metadata = {
  title: 'Contact',
};

export default function ContactPage() {
  return (
    <PageTransition>
      <section className="min-h-screen pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-4">
              Get In Touch
            </h1>
            <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
              Have a project in mind? Fill out the form below and I&apos;ll get back to you as soon as possible.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="flex items-center gap-4 p-4 bg-surface border border-border rounded-xl">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-foreground/50">Email</p>
                <p className="text-foreground text-sm">{personalInfo.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-surface border border-border rounded-xl">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Phone className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-foreground/50">Phone</p>
                <p className="text-foreground text-sm">{personalInfo.phone}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-surface border border-border rounded-xl">
              <div className="p-3 bg-primary/10 rounded-lg">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-foreground/50">Location</p>
                <p className="text-foreground text-sm">Basel, Switzerland</p>
              </div>
            </div>
          </div>

          <div className="bg-surface border border-border rounded-2xl p-6 md:p-10">
            <ContactForm />
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
