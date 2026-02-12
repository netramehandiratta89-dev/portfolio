export default function Loading() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-background">
      <div className="relative h-24 w-24">
        <div className="absolute inset-0 animate-pulse rounded-full bg-primary opacity-50"></div>
        <div className="absolute inset-2 animate-[pulse_1s_ease-in-out_infinite] rounded-full bg-primary/80"></div>
        <div className="absolute inset-4 flex items-center justify-center font-headline text-lg font-bold text-primary-foreground">
          CD
        </div>
      </div>
    </div>
  );
}
