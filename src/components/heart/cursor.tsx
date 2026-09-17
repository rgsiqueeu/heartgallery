"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useLang } from "@/lib/hg-i18n";

export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [viewing, setViewing] = useState(false);
  const enabledRef = useRef(false);
  const { t } = useLang();

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.6 });

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine) return;
    document.body.classList.add("custom-cursor");

    const move = (e: MouseEvent) => {
      if (!enabledRef.current) {
        enabledRef.current = true;
        setEnabled(true);
      }
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      setHovering(
        !!el.closest("a, button, [role='button'], input, textarea, label, summary")
      );
      setViewing(!!el.closest("[data-cursor='view']"));
    };
    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over, { passive: true });
    return () => {
      document.body.classList.remove("custom-cursor");
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="fixed top-0 left-0 z-[200] pointer-events-none"
      style={{ x: sx, y: sy }}
    >
      <motion.div
        className="flex items-center justify-center rounded-full bg-heart -translate-x-1/2 -translate-y-1/2"
        animate={{
          width: viewing ? 72 : hovering ? 44 : 10,
          height: viewing ? 72 : hovering ? 44 : 10,
          opacity: 1,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
      >
        {viewing && (
          <span className="font-grotesk text-[10px] tracking-[0.2em] uppercase text-bone">
            {t.cursor.view}
          </span>
        )}
      </motion.div>
    </motion.div>
  );
}
