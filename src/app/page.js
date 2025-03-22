import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Hero Section - Full viewport height */}
      <section className="flex-1 flex items-center justify-center bg-gradient-to-b from-background to-foreground/5">
        <div className="max-w-5xl mx-auto px-4 py-12 text-center">
          <div className="relative w-40 h-40 mx-auto mb-8">
            <Image
              src="/images/RyanJRichards_Profile_Picture.jpg"
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
              href="/connect"
              className="rounded-full border border-foreground/10 px-6 py-3 hover:bg-foreground/5 transition-colors"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}