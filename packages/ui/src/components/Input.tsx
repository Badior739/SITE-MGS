import React from 'react';
import { cn } from '../utils/classnames';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, ...props }, ref) => (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
      <input
        ref={ref}
        className={cn(
          'px-3 py-2 border rounded-md text-base transition-colors',
          error ? 'border-red-500' : 'border-gray-300 focus:border-blue-500',
          className
        )}
        {...props}
      />
      {error && <span className="text-sm text-red-500">{error}</span>}
      {helperText && <span className="text-sm text-gray-500">{helperText}</span>}
    </div>
  )
);

Input.displayName = 'Input';
