import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="min-h-[90vh] flex items-center justify-center bg-gradient-to-b from-background to-foreground/5">
        <div className="max-w-5xl mx-auto px-4 py-20 text-center">
          <div className="relative w-40 h-40 mx-auto mb-8">
            <Image
              src="/images/IMG_9050.JPG"
              alt="Ryan J Richards"
              fill
              className="rounded-full object-cover"
              priority
            />
          </div>
          <h1 className="text-6xl font-bold mb-6 font-[family-name:var(--font-geist-sans)]">
            Hi, I&apos;m <span className="accent-link">Ryan J Richards</span>
          </h1>
          <p className="text-xl text-foreground/70 mb-8 max-w-2xl mx-auto">
            Enterprise Sales Engineer at Datadog
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/about"
              className="rounded-full bg-foreground/10 text-foreground px-6 py-3 hover:bg-foreground/20 transition-colors"
            >
              Learn More
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-foreground/10 px-6 py-3 hover:bg-foreground/5 transition-colors"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Links */}
<section className="py-20 bg-background">
  <div className="max-w-5xl mx-auto px-4">
    <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-8">
      <Link href="/about" className="group">
        <div className="h-full bg-foreground/5 rounded-lg p-6 border border-foreground/10 hover:bg-foreground/10 transition-colors">
          <h2 className="text-xl font-semibold mb-2">About</h2>
          <p className="text-foreground/70">Learn about my background and expertise in cloud solutions and AI.</p>
        </div>
      </Link>
      <Link href="/projects" className="group">
        <div className="h-full bg-foreground/5 rounded-lg p-6 border border-foreground/10 hover:bg-foreground/10 transition-colors">
          <h2 className="text-xl font-semibold mb-2">Projects</h2>
          <p className="text-foreground/70">Explore my work in cloud observability and AI implementation.</p>
        </div>
      </Link>
      <Link href="/chatbot" className="group">
        <div className="h-full bg-foreground/5 rounded-lg p-6 border border-foreground/10 hover:bg-accent/10 hover:border-accent/30 transition-colors">
          <h2 className="text-xl font-semibold mb-2">AI Chat</h2>
          <p className="text-foreground/70">Have a conversation with my AI assistant to learn more about me.</p>
        </div>
      </Link>
      <Link href="/teams" className="group">
        <div className="h-full bg-foreground/5 rounded-lg p-6 border border-foreground/10 hover:bg-foreground/10 transition-colors">
          <h2 className="text-xl font-semibold mb-2">My Teams</h2>
          <p className="text-foreground/70">Check out the sports teams I support across different leagues.</p>
        </div>
      </Link>
      <Link href="/contact" className="group">
        <div className="h-full bg-foreground/5 rounded-lg p-6 border border-foreground/10 hover:bg-foreground/10 transition-colors">
          <h2 className="text-xl font-semibold mb-2">Contact</h2>
          <p className="text-foreground/70">Get in touch to discuss cloud solutions or just to connect.</p>
        </div>
      </Link>
    </div>
  </div>
</section>
    </main>
  );
}
