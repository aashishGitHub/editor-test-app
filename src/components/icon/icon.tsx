import { clsx } from 'clsx';
import { IconName, IconSize, IconStyle } from './icon.types';

interface IconProps {
  title?: string;
  name: IconName;
  style?: IconStyle;
  className?: string;
  size?: IconSize;
  dataAutoId?: string;
}

const sizeClass: { [P in IconSize]: string } = {
  xsmall: 'w-2 h-2',
  small: 'w-3 h-3',
  large: 'w-5 h-5',
  xlarge: 'w-6 h-6',
  xxlarge: 'w-8 h-8',
  xxxlarge: 'w-10 h-10',
  xxxxlarge: 'w-[8rem] h-[8rem]',
  default: 'w-4 h-4',
};

// Simple SVG icons
const iconSvgs: Record<IconName, JSX.Element> = {
  play: (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 5v14l11-7z" />
    </svg>
  ),
  'down-chevron': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" xmlns="http://www.w3.org/2000/svg">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  ),
  'up-chevron': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" xmlns="http://www.w3.org/2000/svg">
      <polyline points="18 15 12 9 6 15" />
    </svg>
  ),
  'left-chevron': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" xmlns="http://www.w3.org/2000/svg">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  ),
  'right-chevron': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" xmlns="http://www.w3.org/2000/svg">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  ),
  plus: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" xmlns="http://www.w3.org/2000/svg">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  ),
  minus: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" xmlns="http://www.w3.org/2000/svg">
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  ),
  sort: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" xmlns="http://www.w3.org/2000/svg">
      <path d="M11 5h10M11 9h7M11 13h4M7 19l-3-3m0 0l-3 3m3-3V5" />
    </svg>
  ),
};

export function Icon({ title, name, size = 'default', style = 'default', className }: IconProps) {
  const iconSvg = iconSvgs[name];

  if (!iconSvg) {
    console.warn(`Invalid icon name: ${name}`);
    return null;
  }

  return (
    <span
      className={clsx(sizeClass[size], className, 'fill-inherit text-inherit', style === 'default' && 'inline-block align-middle')}
      aria-hidden="true"
      title={title}
    >
      {iconSvg}
    </span>
  );
}

