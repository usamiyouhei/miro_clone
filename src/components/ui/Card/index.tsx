import './Card.css';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export default function Card({
  children,
  className = '',
  padding = 'lg',
}: CardProps) {
  const paddingClass = `ui-card--padding-${padding}`;

  return (
    <div className={`ui-card ${paddingClass} ${className}`}>{children}</div>
  );
}
