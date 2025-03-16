'use client';

import React from 'react';
import Image from 'next/image';

interface TeamLogoProps {
  src: string;
  alt: string;
  teamImage?: string;
}

export default function TeamLogo({ src, alt, teamImage }: TeamLogoProps) {
  return (
    <>
      {teamImage ? (
        <Image
          src={teamImage}
          alt={`${alt} stadium or team photo`}
          fill
          className="object-cover"
          priority
        />
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          className="object-contain p-8"
          unoptimized={src.endsWith('.svg')}
          onError={(e) => {
            e.currentTarget.style.opacity = '0.5';
            e.currentTarget.style.backgroundColor = '#f0f0f0';
          }}
        />
      )}
    </>
  );
} 