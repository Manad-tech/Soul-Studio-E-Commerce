interface PageTitleProps {
  title: string;
  description?: string;
}

export default function PageTitle({
  title,
  description,
}: PageTitleProps) {
  return (
    <div className="space-y-4 py-12">
      <h1 className="text-5xl font-semibold text-(--heading)">
        {title}
      </h1>

      {description && (
        <p className="max-w-2xl text-lg text-var(--body)">
          {description}
        </p>
      )}
    </div>
  );
}