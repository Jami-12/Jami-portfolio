"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";

const INTERACTIVE_SELECTOR =
  "a, button, input, textarea, select, label, [role='button'], [role='link']";

const ORB_PRESETS = [
  { size: 14, stiffness: 600, damping: 48, opacity: 0.4 },
  { size: 24, stiffness: 400, damping: 44, opacity: 0.24 },
  { size: 34, stiffness: 260, damping: 40, opacity: 0.14 },
  { size: 46, stiffness: 160, damping: 36, opacity: 0.08 },
] as const;

const CAT_SIZE = 28;

function CursorOrb({
  mouseX,
  mouseY,
  size,
  stiffness,
  damping,
  opacity,
  visible,
}: {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  size: number;
  stiffness: number;
  damping: number;
  opacity: number;
  visible: boolean;
}) {
  const springX = useSpring(mouseX, { stiffness, damping, mass: 1 });
  const springY = useSpring(mouseY, { stiffness, damping, mass: 1 });
  const x = useTransform(springX, (v) => v - size / 2);
  const y = useTransform(springY, (v) => v - size / 2);

  return (
    <motion.div
      className="absolute left-0 top-0 rounded-full bg-foreground"
      style={{ x, y, width: size, height: size }}
      animate={{ opacity: visible ? opacity : 0 }}
      transition={{ opacity: { duration: 0.2 } }}
    />
  );
}

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [tilt, setTilt] = useState(0);

  const prevPos = useRef({ x: 0, y: 0 });
  const directionRef = useRef<1 | -1>(1);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const catSpringX = useSpring(mouseX, {
    stiffness: 950,
    damping: 52,
    mass: 0.45,
  });
  const catSpringY = useSpring(mouseY, {
    stiffness: 950,
    damping: 52,
    mass: 0.45,
  });
  const catX = useTransform(catSpringX, (v) => v - CAT_SIZE / 2);
  const catY = useTransform(catSpringY, (v) => v - CAT_SIZE / 2);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!finePointer || reduceMotion) return;

    const enableFrame = window.requestAnimationFrame(() => {
      setEnabled(true);
      document.body.classList.add("custom-cursor");
    });

    const onMove = (event: MouseEvent) => {
      const dx = event.clientX - prevPos.current.x;
      const dy = event.clientY - prevPos.current.y;

      if (Math.abs(dx) > 2) {
        const next: 1 | -1 = dx > 0 ? 1 : -1;
        if (next !== directionRef.current) {
          directionRef.current = next;
          setDirection(next);
        }
      }

      if (Math.abs(dy) > 0.4) {
        setTilt(Math.max(-10, Math.min(10, -dy * 0.7)));
      }

      prevPos.current = { x: event.clientX, y: event.clientY };
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
      setVisible(true);

      const target = event.target as HTMLElement | null;
      setHovering(
        Boolean(target && target.closest(INTERACTIVE_SELECTOR))
      );
    };

    const onLeave = () => setVisible(false);

    const onDown = (event: MouseEvent) => {
      setPressed(true);
      const target = event.target as HTMLElement | null;
      setHovering(Boolean(target && target.closest(INTERACTIVE_SELECTOR)));
    };

    const onUp = () => setPressed(false);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      window.cancelAnimationFrame(enableFrame);
      document.body.classList.remove("custom-cursor");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [mouseX, mouseY]);

  if (!enabled) return null;

  return (
    <div
      className="pointer-events-none fixed left-0 top-0 z-[9999] hidden md:block select-none print:hidden"
      aria-hidden="true"
    >
      {ORB_PRESETS.map((orb) => (
        <CursorOrb
          key={orb.size}
          mouseX={mouseX}
          mouseY={mouseY}
          size={orb.size}
          stiffness={orb.stiffness}
          damping={orb.damping}
          opacity={orb.opacity}
          visible={visible}
        />
      ))}

      <motion.div
        className="absolute left-0 top-0"
        style={{ x: catX, y: catY }}
        animate={{
          opacity: visible ? 1 : 0,
          scale: pressed ? 0.8 : hovering ? 1.35 : 1,
          scaleX: direction,
          rotate: tilt,
        }}
        transition={{
          opacity: { duration: 0.18 },
          scale: { type: "spring", stiffness: 480, damping: 27, mass: 0.6 },
          scaleX: { type: "spring", stiffness: 260, damping: 20, mass: 0.5 },
          rotate: { type: "spring", stiffness: 340, damping: 22 },
        }}
      >
        <div
          className="flex items-center justify-center"
          style={{ width: CAT_SIZE, height: CAT_SIZE }}
        >
          <span
            className="absolute -inset-1.5 rounded-full bg-foreground/10 blur-md"
            style={{ width: CAT_SIZE + 12, height: CAT_SIZE + 12 }}
          />
          <span
            className="relative block leading-none"
            style={{ fontSize: CAT_SIZE }}
          >
            🐱
          </span>
        </div>
      </motion.div>
    </div>
  );
}