'use client';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  full?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

const sizeClasses = {
  sm: 'py-[10px] px-[16px] text-[10px]',
  md: 'py-[15px] px-[22px] text-[10.5px]',
  lg: 'py-[18px] px-[28px] text-[11px]',
};

export default function Button({ children, variant = 'primary', size = 'md', full = false, onClick, type = 'button' }: ButtonProps) {
  const isPrimary = variant === 'primary';
  return (
    <button
      type={type}
      onClick={onClick}
      className={[
        'font-mono tracking-[0.25em] uppercase cursor-pointer transition-all duration-150',
        sizeClasses[size],
        isPrimary
          ? 'bg-sumi text-paper border-0 hover:bg-slate'
          : 'bg-transparent text-sumi border border-sumi',
        full ? 'w-full' : '',
      ].join(' ')}
    >
      {children}
    </button>
  );
}
