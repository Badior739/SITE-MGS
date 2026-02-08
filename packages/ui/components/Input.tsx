// Input component
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className = '', ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label className="text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
            error ? 'border-error' : 'border-gray-300'
          } ${className}`}
          {...props}
        />
        {error && <span className="text-xs text-error">{error}</span>}
        {helperText && (
          <span className="text-xs text-gray-500">{helperText}</span>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';
