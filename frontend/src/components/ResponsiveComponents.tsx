import React from 'react';

// Responsive Container Component
interface ResponsiveContainerProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'narrow' | 'wide';
}

export const ResponsiveContainer: React.FC<ResponsiveContainerProps> = ({ 
  children, 
  className = '', 
  variant = 'default' 
}) => {
  const baseClass = variant === 'narrow' ? 'container-narrow' : 
                   variant === 'wide' ? 'container-wide' : 
                   'container-responsive';
  
  return (
    <div className={`${baseClass} ${className}`}>
      {children}
    </div>
  );
};

// Responsive Grid Component
interface ResponsiveGridProps {
  children: React.ReactNode;
  className?: string;
  cols?: 1 | 2 | 3;
  gap?: 'sm' | 'md' | 'lg';
}

export const ResponsiveGrid: React.FC<ResponsiveGridProps> = ({ 
  children, 
  className = '', 
  cols = 1,
  gap = 'md'
}) => {
  const gridClass = `grid-responsive-${cols}`;
  const gapClass = `gap-responsive-${gap}`;
  
  return (
    <div className={`${gridClass} ${gapClass} ${className}`}>
      {children}
    </div>
  );
};

// Responsive Text Component
interface ResponsiveTextProps {
  children: React.ReactNode;
  className?: string;
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
  as?: 'p' | 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export const ResponsiveText: React.FC<ResponsiveTextProps> = ({ 
  children, 
  className = '', 
  size = 'base',
  as: Component = 'p'
}) => {
  const sizeClass = `text-responsive-${size}`;
  
  return (
    <Component className={`${sizeClass} ${className}`}>
      {children}
    </Component>
  );
};

// Responsive Button Component
interface ResponsiveButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
}

export const ResponsiveButton: React.FC<ResponsiveButtonProps> = ({ 
  children, 
  className = '', 
  size = 'md',
  variant = 'primary',
  ...props
}) => {
  const sizeClass = `btn-responsive-${size}`;
  const variantClass = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700',
    outline: 'border border-primary-600 text-primary-600 hover:bg-primary-50',
    ghost: 'text-primary-600 hover:bg-primary-50'
  }[variant];
  
  return (
    <button 
      className={`${sizeClass} ${variantClass} rounded-lg font-medium transition ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

// Responsive Card Component
interface ResponsiveCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'sm' | 'md' | 'lg';
}

export const ResponsiveCard: React.FC<ResponsiveCardProps> = ({ 
  children, 
  className = '', 
  hover = false,
  padding = 'md'
}) => {
  const baseClass = hover ? 'card-responsive-hover' : 'card-responsive';
  const paddingClass = `p-responsive-${padding}`;
  
  return (
    <div className={`${baseClass} ${paddingClass} ${className}`}>
      {children}
    </div>
  );
};

// Responsive Image Component
interface ResponsiveImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  aspect?: 'square' | 'video' | 'auto';
  className?: string;
}

export const ResponsiveImage: React.FC<ResponsiveImageProps> = ({ 
  src, 
  alt, 
  aspect = 'auto',
  className = '',
  ...props
}) => {
  const aspectClass = aspect === 'square' ? 'img-responsive-square' :
                     aspect === 'video' ? 'img-responsive-video' :
                     'img-responsive';
  
  return (
    <img 
      src={src} 
      alt={alt} 
      className={`${aspectClass} ${className}`}
      {...props}
    />
  );
};

// Responsive Form Component
interface ResponsiveFormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode;
  className?: string;
}

export const ResponsiveForm: React.FC<ResponsiveFormProps> = ({ 
  children, 
  className = '', 
  ...props
}) => {
  return (
    <form className={`form-responsive ${className}`} {...props}>
      {children}
    </form>
  );
};

// Responsive Input Component
interface ResponsiveInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export const ResponsiveInput: React.FC<ResponsiveInputProps> = ({ 
  className = '', 
  ...props
}) => {
  return (
    <input 
      className={`input-responsive ${className}`}
      {...props}
    />
  );
};

// Responsive Textarea Component
interface ResponsiveTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
}

export const ResponsiveTextarea: React.FC<ResponsiveTextareaProps> = ({ 
  className = '', 
  ...props
}) => {
  return (
    <textarea 
      className={`textarea-responsive ${className}`}
      {...props}
    />
  );
};

// Responsive Modal Component
interface ResponsiveModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

export const ResponsiveModal: React.FC<ResponsiveModalProps> = ({ 
  isOpen, 
  onClose: _onClose, 
  children, 
  className = '' 
}) => {
  if (!isOpen) return null;
  
  return (
    <div className="modal-responsive">
      <div className="modal-content-responsive">
        <div className={`${className}`}>
          {children}
        </div>
      </div>
    </div>
  );
};

// Responsive Table Component
interface ResponsiveTableProps {
  children: React.ReactNode;
  className?: string;
}

export const ResponsiveTable: React.FC<ResponsiveTableProps> = ({ 
  children, 
  className = '' 
}) => {
  return (
    <div className="table-responsive">
      <table className={`table-responsive-content ${className}`}>
        {children}
      </table>
    </div>
  );
};

// Responsive Navigation Component
interface ResponsiveNavProps {
  children: React.ReactNode;
  className?: string;
}

export const ResponsiveNav: React.FC<ResponsiveNavProps> = ({ 
  children, 
  className = '' 
}) => {
  return (
    <nav className={`nav-responsive ${className}`}>
      {children}
    </nav>
  );
};

// Responsive Visibility Component
interface ResponsiveVisibilityProps {
  children: React.ReactNode;
  className?: string;
  show?: 'mobile' | 'tablet' | 'desktop' | 'mobile-tablet' | 'tablet-desktop';
}

export const ResponsiveVisibility: React.FC<ResponsiveVisibilityProps> = ({ 
  children, 
  className = '', 
  show = 'mobile' 
}) => {
  const visibilityClass = `visible-${show}`;
  
  return (
    <div className={`${visibilityClass} ${className}`}>
      {children}
    </div>
  );
};

// Components are already exported above
