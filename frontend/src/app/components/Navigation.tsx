'use client';

import Link from "next/link";
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

function NavLink({ 
  href, 
  children, 
  onNavigate 
}: { 
  href: string; 
  children: React.ReactNode;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;
  
  return (
    <Link 
      href={href} 
      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
        isActive 
          ? 'bg-foreground/10 text-foreground' 
          : 'text-foreground/70 hover:bg-foreground/5 hover:text-foreground'
      }`}
      onClick={onNavigate}
    >
      {children}
    </Link>
  );
}

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Function to close the mobile menu
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  if (!mounted) {
    return null;
  }

  return (
    <>
      <nav className="fixed w-full bg-background/90 backdrop-blur-sm border-b border-foreground/10 z-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center" onClick={closeMobileMenu}>
                <span className="text-xl font-bold text-foreground/90 font-[family-name:var(--font-geist-sans)]">Ryan J Richards</span>
              </Link>
            </div>
            <div className="hidden lg:flex lg:items-center lg:space-x-1">
              <NavLink href="/about">About Me</NavLink>
              <NavLink href="/projects">Projects</NavLink>
              <NavLink href="/fandom">Fandom</NavLink>
              <NavLink href="/travel">Travel</NavLink>
              <NavLink href="/ai_assistant">AI Assistant</NavLink>
              <NavLink href="/connect">Connect</NavLink>
              <div className="flex items-center space-x-4 ml-6 border-l border-foreground/10 pl-6">
                <a
                  href="https://github.com/ryanjrichards"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/70 hover:text-foreground transition-colors"
                  aria-label="GitHub"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/in/ryanjrichards"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/70 hover:text-foreground transition-colors"
                  aria-label="LinkedIn"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              </div>
            </div>
            <div className="flex lg:hidden">
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-foreground/70 hover:text-foreground hover:bg-foreground/5 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-foreground"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-foreground/20 backdrop-blur-sm" onClick={closeMobileMenu} />
          <nav className="fixed right-0 top-0 bottom-0 w-3/4 max-w-sm bg-background shadow-xl flex flex-col">
            <div className="p-4 flex justify-between items-center border-b border-foreground/10">
              <h2 className="font-semibold text-lg font-[family-name:var(--font-geist-sans)]">Menu</h2>
              <button
                onClick={closeMobileMenu}
                className="p-2 rounded-md hover:bg-foreground/5 text-foreground/70 hover:text-foreground"
                aria-label="Close menu"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="px-2 py-4 flex flex-col space-y-1">
              <Link 
                href="/" 
                className="px-3 py-2 rounded-md text-base font-medium text-foreground/70 hover:bg-foreground/5 hover:text-foreground"
                onClick={closeMobileMenu}
              >
                Home
              </Link>
              <Link 
                href="/about" 
                className="px-3 py-2 rounded-md text-base font-medium text-foreground/70 hover:bg-foreground/5 hover:text-foreground"
                onClick={closeMobileMenu}
              >
                About Me
              </Link>
              <Link 
                href="/projects" 
                className="px-3 py-2 rounded-md text-base font-medium text-foreground/70 hover:bg-foreground/5 hover:text-foreground"
                onClick={closeMobileMenu}
              >
                Projects
              </Link>
              <Link 
                href="/fandom" 
                className="px-3 py-2 rounded-md text-base font-medium text-foreground/70 hover:bg-foreground/5 hover:text-foreground"
                onClick={closeMobileMenu}
              >
                Fandom
              </Link>
              <Link 
                href="/travel" 
                className="px-3 py-2 rounded-md text-base font-medium text-foreground/70 hover:bg-foreground/5 hover:text-foreground"
                onClick={closeMobileMenu}
              >
                Travel
              </Link>
              <Link 
                href="/ai_assistant" 
                className="px-3 py-2 rounded-md text-base font-medium text-foreground/70 hover:bg-foreground/5 hover:text-foreground"
                onClick={closeMobileMenu}
              >
                AI Assistant
              </Link>
              <Link 
                href="/connect" 
                className="px-3 py-2 rounded-md text-base font-medium text-foreground/70 hover:bg-foreground/5 hover:text-foreground"
                onClick={closeMobileMenu}
              >
                Connect
              </Link>
            </div>
            <div className="mt-auto p-4 border-t border-foreground/10">
              <div className="flex justify-center space-x-6">
                <a
                  href="https://github.com/ryanjrichards"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/70 hover:text-foreground"
                  aria-label="GitHub"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/in/ryanjrichards"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/70 hover:text-foreground"
                  aria-label="LinkedIn"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              </div>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}