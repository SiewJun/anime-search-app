interface EmptyStateProps {
  title?: string;
  description?: string;
}

export function EmptyState({
  title,
  description,
}: EmptyStateProps) {
  return (
    <div className="text-center space-y-2 mt-4">
      <p className="text-lg font-semibold text-muted-foreground">{title}</p>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
