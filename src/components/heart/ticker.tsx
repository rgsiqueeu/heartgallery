"use client";

export default function Ticker({
  items,
  duration = 30,
  variant = "red",
  reverse = false,
}: {
  items: string[];
  duration?: number;
  variant?: "red" | "ghost";
  reverse?: boolean;
}) {
  const row = (copy: number) => (
    <div key={copy} className="flex items-center shrink-0">
      {items.map((txt, i) => (
        <span
          key={`${copy}-${i}`}
          className={`whitespace-nowrap px-4 md:px-6 ${
            variant === "red"
              ? "font-anton text-xl md:text-3xl uppercase text-ink"
              : "font-serif italic text-3xl md:text-5xl text-fog/50"
          }`}
        >
          {txt}
        </span>
      ))}
    </div>
  );

  return (
    <div
      className={`overflow-hidden select-none ${
        variant === "red" ? "bg-heart py-3 md:py-4" : "py-6"
      }`}
      aria-hidden
    >
      <div
        className={`flex w-max ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`}
        style={{ ["--marquee-duration" as string]: `${duration}s` }}
      >
        {[0, 1].map(row)}
      </div>
    </div>
  );
}
