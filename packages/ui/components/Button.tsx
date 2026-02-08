// Shared button component
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      className = '',
      disabled,
      loading,
      children,
      ...props
    },
    ref,
  ) => {
    const baseClasses = 'font-medium rounded transition-colors duration-200 flex items-center justify-center gap-2';

    const variantClasses = {
      primary: 'bg-primary-500 text-white hover:bg-primary-600 disabled:bg-gray-400',
      secondary: 'bg-secondary-500 text-white hover:bg-secondary-600 disabled:bg-gray-400',
      outline: 'border-2 border-primary-500 text-primary-500 hover:bg-primary-50',
      ghost: 'text-primary-500 hover:bg-gray-100',
    };

    const sizeClasses = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2.5 text-base',
      lg: 'px-6 py-3.5 text-lg',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
        {...props}
      >
        {loading && <Spinner size={size} />}
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';
