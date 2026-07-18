"use client";

import { motion, type Variants } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  /** Animation start delay in seconds. Useful for staggering siblings. */
  delay?: number;
  /** Direction content slides in from. Defaults to "up". */
  direction?: "up" | "down" | "left" | "right" | "none";
  /** Distance (px) travelled during the animation. */
  distance?: number;
  /** Animation duration in seconds. */
  duration?: number;
  className?: string;
  style?: CSSProperties;
  /** Fraction of the element that must be visible before it animates. */
  amount?: number;
  /** Re-trigger every time the element enters the viewport instead of only once. */
  repeat?: boolean;
  as?: "div" | "span";
}

const offsets: Record<NonNullable<RevealProps["direction"]>, (d: number) => { x?: number; y?: number }> = {
  up: (d) => ({ y: d }),
  down: (d) => ({ y: -d }),
  left: (d) => ({ x: d }),
  right: (d) => ({ x: -d }),
  none: () => ({}),
};

/**
 * Fades + slides children into place the first time they scroll into
 * the viewport. Wrap any section heading, card, or block with this to
 * give the homepage scroll-driven motion instead of everything just
 * being statically present on load.
 *
 * Usage:
 *   <Reveal><h2>Heading</h2></Reveal>
 *   <Reveal delay={0.1 * i}><Card /></Reveal>   // staggered list
 */
export default function Reveal({
  children,
  delay = 0,
  direction = "up",
  distance = 28,
  duration = 0.6,
  className,
  style,
  amount = 0.2,
  repeat = false,
  as = "div",
}: RevealProps) {
  const offset = offsets[direction](distance);

  const variants: Variants = {
    hidden: { opacity: 0, ...offset },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration, delay, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const MotionTag = as === "span" ? motion.span : motion.div;

  return (
    <MotionTag
      className={className}
      style={style}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: !repeat, amount }}
      variants={variants}
    >
      {children}
    </MotionTag>
  );
}