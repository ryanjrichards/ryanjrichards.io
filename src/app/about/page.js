import Image from "next/image";

export default function About() {
  return (
    <div className="pt-16">
      <section className="py-20 bg-background">
        <div className="max-w-5xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8 font-[family-name:var(--font-geist-mono)]">About Me</h1>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <div className="relative w-48 h-48 mb-6 mx-auto md:mx-0">
                <Image
                  src="/IMG_9050.JPG"
                  alt="Ryan Richards"
                  fill
                  className="rounded-full object-cover"
                  priority
                />
              </div>
              <p className="text-foreground/70">
                I&apos;m an Enterprise Sales Engineer at Datadog, where I specialize in helping businesses unlock the full potential 
                of their cloud environments through observability, performance monitoring, and AI-driven insights. I partner with 
                enterprise clients across the Ohio River Valley to solve complex technical challenges and design scalable solutions.
              </p>
              <p className="text-foreground/70">
                With a background in AI and machine learning from my time in the LLM space, I bridge the gap between technical 
                and business stakeholders. Outside of work, I&apos;m an avid motorcyclist and enjoy hands-on projects like 
                landscaping and home improvement. Having lived in multiple states and countries, including China and Malaysia, 
                I bring a global perspective to building strong, diverse relationships.
              </p>
            </div>
            <div>
              <div className="bg-foreground/5 p-6 rounded-lg">
                <h3 className="font-semibold mb-4 font-[family-name:var(--font-geist-mono)]">Expertise</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Cloud & DevOps</h4>
                    <ul className="text-foreground/70 space-y-1">
                      <li>AWS</li>
                      <li>Azure</li>
                      <li>Observability</li>
                      <li>Performance Monitoring</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Technologies</h4>
                    <ul className="text-foreground/70 space-y-1">
                      <li>AI/ML Solutions</li>
                      <li>Cloud Infrastructure</li>
                      <li>Data Analytics</li>
                      <li>Security & Compliance</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 