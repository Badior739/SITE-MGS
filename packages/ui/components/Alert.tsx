// Alert component
export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  dismissible?: boolean;
  onDismiss?: () => void;
}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      type = 'info',
      title,
      dismissible,
      onDismiss,
      className = '',
      children,
      ...props
    },
    ref,
  ) => {
    const typeClasses = {
      info: 'bg-info/10 text-info border border-info/30',
      success: 'bg-success/10 text-success border border-success/30',
      warning: 'bg-warning/10 text-warning border border-warning/30',
      error: 'bg-error/10 text-error border border-error/30',
    };

    return (
      <div
        ref={ref}
        className={`rounded-lg p-4 ${typeClasses[type]} ${className}`}
        {...props}
      >
        {title && <h3 className="font-semibold mb-1">{title}</h3>}
        <p>{children}</p>
        {dismissible && (
          <button
            onClick={onDismiss}
            className="absolute top-4 right-4 text-lg font-bold"
          >
            ×
          </button>
        )}
      </div>
    );
  },
);

Alert.displayName = 'Alert';
