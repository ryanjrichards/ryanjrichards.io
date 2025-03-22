import React from 'react';
import Image from "next/image";

interface ProjectCardProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  tags: string[];
  link?: {
    href: string;
    text: string;
  };
}

export default function ProjectCard({
  title,
  description,
  imageSrc,
  imageAlt,
  tags,
  link
}: ProjectCardProps) {
  return (
    <div className="bg-background rounded-lg overflow-hidden border border-foreground/10 h-full flex flex-col">
      <div className="aspect-[16/9] relative">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-foreground/70 mb-4 flex-grow">{description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <span key={tag} className="px-2 py-1 bg-foreground/5 rounded-full text-sm">
              {tag}
            </span>
          ))}
        </div>
        {link && (
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground hover:underline mt-auto"
          >
            {link.text} →
          </a>
        )}
      </div>
    </div>
  );
} 