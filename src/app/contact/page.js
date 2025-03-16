export default function Contact() {
  return (
    <div className="pt-16">
      <section className="py-20 bg-background">
        <div className="max-w-5xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8 font-[family-name:var(--font-geist-mono)]">Contact</h1>
          <p className="text-foreground/70 mb-12">
            Let&apos;s connect! Whether you&apos;re interested in cloud observability, AI solutions, or just want to talk tech, I&apos;m always happy to chat.
          </p>
          <div className="max-w-2xl mx-auto">
            <div className="flex flex-col gap-8">
              <div className="bg-foreground/5 rounded-lg p-6 border border-foreground/10">
                <h2 className="text-xl font-semibold mb-4">Get in Touch</h2>
                <div className="flex gap-4 justify-center">
                  <a
                    href="mailto:ryan.richards@datadoghq.com"
                    className="rounded-full bg-foreground text-background px-6 py-3 hover:bg-foreground/90 transition-colors"
                  >
                    Email Me
                  </a>
                  <a
                    href="https://github.com/ryanjrichards"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-foreground/10 px-6 py-3 hover:bg-foreground/5 transition-colors"
                  >
                    GitHub
                  </a>
                  <a
                    href="https://www.linkedin.com/in/ryanjrichards"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-foreground/10 px-6 py-3 hover:bg-foreground/5 transition-colors"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
              
              <div className="bg-foreground/5 rounded-lg p-6 border border-foreground/10">
                <h2 className="text-xl font-semibold mb-4">Location</h2>
                <p className="text-foreground/70">
                  Based in Greater Cleveland, serving enterprise clients across the Ohio River Valley region.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 