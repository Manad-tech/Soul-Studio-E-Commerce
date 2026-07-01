import { cn } from "@/lib/utils";

interface HeadingProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}

export default function Heading ({
  title,
  subtitle,
  align = 'left',
  className
}: HeadingProps) {
  return (
    <div
      className={cn(
        align === 'center' ? 'text-center' : 'text-left',
        className
      )}
    >
      {subtitle && (
        <p className="mb-3 text-sm uppercase tracking-[0.35em] text-(--primary) ">
          {subtitle}
        </p>
      )}

      <h2 className="text-4xl font-semibold text-(--heading) md:text-5xl lg:text-6xl">
        {title}
      </h2>
    </div>
  );
}