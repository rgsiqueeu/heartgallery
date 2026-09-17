export const EASE = [0.65, 0, 0.35, 1] as const;
export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

export function HeartSvg({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 21.35S2.4 15.36 2.4 9.28C2.4 5.81 5.21 3 8.68 3c1.87 0 3.53.9 4.62 2.3C14.39 3.9 16.05 3 17.92 3c3.47 0 6.28 2.81 6.28 6.28 0 6.08-9.6 12.07-9.6 12.07z" transform="translate(-1.4 -1)" />
    </svg>
  );
}
