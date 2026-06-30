import { ElementType } from 'react';
import './GlitchText.css';

interface GlitchTextProps {
  text: string;
  as?: ElementType;
  className?: string;
}

export default function GlitchText({ text, as, className = '' }: GlitchTextProps) {
  const Component = (as || 'span') as any;
  return (
    <Component className={`glitch-text ${className}`} data-text={text}>
      {text}
    </Component>
  );
}
