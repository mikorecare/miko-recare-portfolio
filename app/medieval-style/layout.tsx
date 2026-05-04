export default function MedievalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen" suppressHydrationWarning>
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-stone-900" />
        <div className="absolute inset-0 opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-stone-900/30 via-transparent to-stone-900/50" />
      </div>

      <div className="relative z-10">{children}</div>
    </div>
  );
}
