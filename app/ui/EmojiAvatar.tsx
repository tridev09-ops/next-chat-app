import React from 'react';

type Props = {
  emoji: string;
  size?: string; // Tailwind size class e.g., 'text-2xl'
};

export default function EmojiAvatar({ emoji, size = 'text-2xl' }: Props) {
  return (
    <div className={`inline-flex items-center justify-center ${size}`} aria-label="user avatar">
      {emoji}
    </div>
  );
}
