export function PageTitle({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="text-4xl font-bold text-zinc-100 mb-8">
      {children}
    </h1>
  );
} 