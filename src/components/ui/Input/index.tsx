import { forwardRef } from 'react';
import './Input.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', id, ...props }, ref) => {
    return (
      <div className="ui-input-container">
        {label && (
          <label htmlFor={id} className="ui-input-label">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={`ui-input-field ${error ? 'error' : ''} ${className}`}
          {...props}
        />
        {error && <p className="ui-input-error-message">{error}</p>}
      </div>
    );
  }
);

export default Input;
