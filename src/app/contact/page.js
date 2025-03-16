import { MapPinIcon, ClockIcon } from '@heroicons/react/24/outline';
import ContactForm from './ContactForm';
import QuickConnect from './QuickConnect';

export default function Contact() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Contact</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-8">
          <QuickConnect />
          
          <div className="bg-foreground/5 rounded-lg p-8 border border-foreground/10 hover:border-foreground/20 transition-colors">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <MapPinIcon className="w-5 h-5" />
              Local Presence
            </h2>
            <p className="text-foreground/80">
              Based in Greater Cleveland, I enjoy meeting with clients in person throughout Northeast Ohio 
              and the surrounding region. I believe face-to-face meetings build stronger relationships and 
              lead to better understanding of your business needs. Whether it's a coffee chat in downtown 
              Cleveland or a visit to your office, I'm always happy to connect locally.
            </p>
          </div>
        </div>

        <div className="bg-foreground/5 rounded-lg p-8 border border-foreground/10 hover:border-foreground/20 transition-colors">
          <h2 className="text-xl font-semibold mb-6">Send a Message</h2>
          <ContactForm />
        </div>
      </div>
    </div>
  );
} 