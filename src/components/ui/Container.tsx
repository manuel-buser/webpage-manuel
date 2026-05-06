import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const containerVariants = cva('mx-auto px-4 sm:px-6 lg:px-8', {
  variants: {
    size: {
      narrow: 'max-w-3xl',
      page: 'max-w-6xl',
      wide: 'max-w-7xl',
    },
  },
  defaultVariants: {
    size: 'page',
  },
});

interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {
  as?: 'div' | 'section' | 'main' | 'article';
}

export function Container({
  className,
  size,
  as: Component = 'div',
  children,
  ...props
}: ContainerProps) {
  return (
    <Component className={cn(containerVariants({ size }), className)} {...props}>
      {children}
    </Component>
  );
}
