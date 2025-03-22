import { MapPinIcon, ClockIcon } from '@heroicons/react/24/outline';
import ContactForm from './components/ContactForm';
import QuickConnect from './components/QuickConnect';

export default function Contact() {
  return (
    <div className="container mx-auto">
<section className="pt-24 pb-20 bg-background">
      <h1 className="text-4xl font-bold mb-8">Contact</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-8">
          <QuickConnect />
          
          <div className="bg-foreground/5 rounded-lg p-8 border border-foreground/10 hover:border-foreground/20 transition-colors">
  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
    <MapPinIcon className="w-5 h-5" />
    Greater Cleveland, Ohio
  </h2>
</div>
        </div>

        <div className="bg-foreground/5 rounded-lg p-8 border border-foreground/10 hover:border-foreground/20 transition-colors">
          <h2 className="text-xl font-semibold mb-6">Send a Message</h2>
          <ContactForm />
        </div>
      </div>
      </section>
    </div>
  );
} 