import React from 'react';
import { cn } from '../utils/classnames';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  onClose?: () => void;
}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, type = 'info', title, onClose, children, ...props }, ref) => {
    const types = {
      info: 'bg-blue-50 border-blue-200 text-blue-800',
      success: 'bg-green-50 border-green-200 text-green-800',
      warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
      error: 'bg-red-50 border-red-200 text-red-800',
    };

    return (
      <div
        ref={ref}
        className={cn('border rounded-lg p-4', types[type], className)}
        {...props}
      >
        {title && <h4 className="font-semibold mb-1">{title}</h4>}
        <p>{children}</p>
        {onClose && (
          <button onClick={onClose} className="absolute top-2 right-2 text-xl">
            ✕
          </button>
        )}
      </div>
    );
  }
);

Alert.displayName = 'Alert';
