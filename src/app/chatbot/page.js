import ChatInterface from './components/ChatInterface';
export const metadata = {
  title: "Chat with Ryan - AI Assistant",
  description: "Chat with my AI assistant to learn more about my experience, skills, and background.",
};

export default function ChatbotPage() {
  return (
    <div className="pt-16">
      <section className="py-20 bg-background">
        <div className="max-w-5xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-6 font-[family-name:var(--font-geist-mono)]">AI Assistant</h1>
          <p className="text-foreground/70 mb-8">
            I&apos;ve built this interactive AI chatbot to help you learn more about my background, skills, 
            and experience. Feel free to ask about my work at Datadog, technical expertise, or interests!
          </p>
          
          <div className="bg-foreground/5 rounded-lg border border-foreground/10 overflow-hidden h-[600px]">
            <ChatInterface />
          </div>
          
          <div className="mt-8 text-sm text-foreground/60">
            <p>This chatbot is powered by AI and may occasionally provide incorrect information. 
            For specific inquiries or to connect directly, please use the <a href="/contact" className="text-accent hover:underline">contact page</a>.</p>
          </div>
        </div>
      </section>
    </div>
  );
}