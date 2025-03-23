import Image from "next/image";
import Link from "next/link";

export default function About() {
  return (
<div className="container mx-auto">
<section className="pt-24 pb-20 bg-background">
        <div className="max-w-5xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8 font-[family-name:var(--font-geist-mono)]">About Me</h1>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <div className="relative w-48 h-48 mb-6 mx-auto md:mx-0">
                <Image
                  src="/images/RyanJRichards_Profile_Picture.jpg"
                  alt="Ryan J Richards"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw" 
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
            <div className="space-y-8">
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

              <div className="bg-foreground/5 p-6 rounded-lg">
                <h3 className="font-semibold mb-4 font-[family-name:var(--font-geist-mono)]">Certifications</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">View My Credentials</h4>
                    <a 
                      href="https://www.credly.com/users/ryanjrichards"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-foreground hover:text-foreground/70 transition-colors"
                    >
                      <span>Credly Profile</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                  <p className="text-foreground/70">
                    I maintain active certifications in cloud technologies, AI/ML, and enterprise solutions. 
                    Visit my Credly profile to view my verified badges and credentials.
                  </p>
                </div>
              </div>

              <div className="bg-foreground/5 p-6 rounded-lg">
                <h3 className="font-semibold mb-4 font-[family-name:var(--font-geist-mono)]">Getting Out in the Tech Scene</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Recent Events & Engagements</h4>
                    <ul className="text-foreground/70 space-y-3">
                      <li>
                        <a 
                          href="https://www.linkedin.com/posts/megankim_cletech-bestoftech-greatercle-ugcPost-7300698717433593858-NEZT"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group"
                        >
                          <span className="block font-medium text-foreground/90 group-hover:text-foreground transition-colors">Greater Cleveland Partnership AI Roundtable</span>
                        </a>
                        <span className="block text-foreground">Participated in discussions on responsible AI implementation and tech-enabled growth strategies for businesses in the region.</span>
                      </li>
                      <li>
                        <a 
                          href="https://www.linkedin.com/posts/ryanjrichards_the-cold-dark-days-of-winter-in-cleveland-activity-7289826457411829760-5Kw7"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group"
                        >
                          <span className="block font-medium text-foreground/90 group-hover:text-foreground transition-colors">Cleveland AI and Data Meetup</span>
                        </a>
                        <span className="block text-foreground">Engaged with talks on reinforcement learning in gaming, retrieval-augmented generation (RAG), and enterprise GenAI platforms.</span>
                      </li>
                      <li>
                        <a 
                          href="https://www.linkedin.com/posts/ryanjrichards_relnventwithdatadog-awsrelnvent-activity-7269144652472057856-s2ZD"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group"
                        >
                          <span className="block font-medium text-foreground/90 group-hover:text-foreground transition-colors">AWS re:Invent</span>
                        </a>
                        <span className="block text-foreground">Attended industry-leading cloud computing conference, focusing on latest developments in AI, cloud observability, and enterprise solutions.</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2 text-2xl">Upcoming Conferences</h4>
                    <ul className="text-foreground/70 space-y-3">
                      <li>
                        <a 
                          href="https://cloud.google.com/next"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group"
                        >
                          <span className="block font-medium text-foreground/90 group-hover:text-foreground transition-colors">Google Cloud Next 2025</span>
                        </a>
                        <span className="block text-foreground">Looking forward to exploring the latest innovations in cloud computing, AI, and enterprise solutions.</span>
                      </li>
                      <li>
                        <a 
                          href="https://us.pycon.org/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group"
                        >
                          <span className="block font-medium text-foreground/90 group-hover:text-foreground transition-colors">PyCon 2025</span>
                        </a>
                        <span className="block text-foreground">Excited to connect with the Python community and learn about the latest developments in Python ecosystem.</span>
                      </li>
                    </ul>
                  </div>

                  <p className="text-foreground/70 mt-4">
                    I&apos;m actively involved in Cleveland&apos;s growing tech community, participating in events that bring together innovators, 
                    thought leaders, and practitioners to discuss emerging technologies and their practical applications in enterprise environments.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 