import React from 'react';
import Image from 'next/image';
import iosLightIcon from '../assets/icons/ios-light.png';

interface LogoProps {
  className?: string;
  size?: number; // Height of the icon/logo, defaults to 32
  variant?: 'default' | 'light' | 'currentColor';
}

/**
 * LogoIcon: The brand mark from the official TimeSince logo.
 */
export const LogoIcon: React.FC<LogoProps> = ({
  className = '',
  size = 32,
}) => {
  return (
    <Image 
      src={iosLightIcon} 
      alt="TimeSince Logo" 
      width={size} 
      height={size} 
      className={`rounded-[22.5%] shadow-sm object-cover ${className}`}
    />
  );
};

export const LogoFullSvg: React.FC<LogoProps> = LogoIcon;

interface FullLogoLayoutProps extends LogoProps {
  showText?: boolean;
}

/**
 * Logo: Renders the official LogoIcon next to the stylized text "TimeSince".
 */
export const Logo: React.FC<FullLogoLayoutProps> = ({
  className = '',
  size = 32,
  variant = 'default',
  showText = true,
}) => {
  const textClass =
    variant === 'light'
      ? 'text-white'
      : variant === 'currentColor'
      ? 'text-current'
      : 'text-gray-900';

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      <LogoIcon size={size} />
      {showText && (
        <span
          className={`font-display text-xl font-bold tracking-tight ${textClass} leading-none`}
        >
          TimeSince
        </span>
      )}
    </div>
  );
};
