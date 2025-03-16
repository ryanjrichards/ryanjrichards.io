import Image from "next/image";

export default function Projects() {
  return (
    <div className="pt-16">
      <section className="py-20 bg-background">
        <div className="max-w-5xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8 font-[family-name:var(--font-geist-mono)]">Projects</h1>
          <p className="text-foreground/70 mb-12">
            Here are some key projects that showcase my expertise in cloud solutions and AI implementation.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-background rounded-lg overflow-hidden border border-foreground/10">
              <div className="aspect-video relative">
                <Image
                  src="https://placehold.co/600x400/png"
                  alt="Cloud Observability Solutions"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Enterprise Cloud Solutions</h3>
                <p className="text-foreground/70 mb-4">
                  Helping enterprises optimize their cloud infrastructure through comprehensive observability and monitoring solutions.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 bg-foreground/5 rounded-full text-sm">AWS</span>
                  <span className="px-2 py-1 bg-foreground/5 rounded-full text-sm">Azure</span>
                  <span className="px-2 py-1 bg-foreground/5 rounded-full text-sm">Datadog</span>
                </div>
                <a href="https://www.datadoghq.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Learn More →</a>
              </div>
            </div>

            <div className="bg-background rounded-lg overflow-hidden border border-foreground/10">
              <div className="aspect-video relative">
                <Image
                  src="https://placehold.co/600x400/png"
                  alt="AI Solutions Architecture"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">AI/ML Solutions Architecture</h3>
                <p className="text-foreground/70 mb-4">
                  Designing and implementing AI-driven solutions for enterprise clients, focusing on practical business outcomes.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 bg-foreground/5 rounded-full text-sm">AI/ML</span>
                  <span className="px-2 py-1 bg-foreground/5 rounded-full text-sm">LLMs</span>
                  <span className="px-2 py-1 bg-foreground/5 rounded-full text-sm">Cloud Architecture</span>
                </div>
                <a href="https://www.linkedin.com/in/ryanjrichards" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View Profile →</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 