
import React from 'react';
import logoImage from '../../assets/logo.png';

interface CCVLogoProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'dark' | 'light';
}

const CCVLogo = ({ size = 'md', variant = 'dark' }: CCVLogoProps) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };
  
  // Apply filter for light variant (invert colors for dark backgrounds)
  const filterClass = variant === 'light' ? 'invert brightness-0' : '';

  return (
    <img 
      src={logoImage} 
      alt="Crowley Capital" 
      className={`${sizeClasses[size]} ${filterClass} object-contain`}
      style={{ 
        backgroundColor: 'transparent',
        mixBlendMode: variant === 'light' ? 'screen' : 'normal'
      }}
    />
  );
};

export default CCVLogo;
