// "use client";

// import { useEffect, useState, useRef } from "react";
// import { motion } from "framer-motion";
// import Image from "next/image";

// export default function CustomCursor() {
//   const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
//   const [isVisible, setIsVisible] = useState(false);
//   const [isMoving, setIsMoving] = useState(false);
//   const [direction, setDirection] = useState<"left" | "right">("right");
//   const [isHovered, setIsHovered] = useState(false);

//   const timeoutRef = useRef<NodeJS.Timeout | null>(null);

//   useEffect(() => {
//     const handleMouseMove = (e: MouseEvent) => {
//       if (!isVisible) setIsVisible(true);

//       if (e.clientX > mousePosition.x + 2) {
//         setDirection("right");
//       } else if (e.clientX < mousePosition.x - 2) {
//         setDirection("left");
//       }

//       setMousePosition({ x: e.clientX, y: e.clientY });
//       setIsMoving(true);

//       if (timeoutRef.current) clearTimeout(timeoutRef.current);
//       timeoutRef.current = setTimeout(() => {
//         setIsMoving(false);
//       }, 150);

//       const target = e.target as HTMLElement;
//       if (
//         target.closest("button") ||
//         target.closest("a") ||
//         target.closest("input") ||
//         target.getAttribute("role") === "button"
//       ) {
//         setIsHovered(true);
//       } else {
//         setIsHovered(false);
//       }
//     };

//     const handleMouseLeave = () => {
//       setIsVisible(false);
//       setIsMoving(false);
//     };

//     window.addEventListener("mousemove", handleMouseMove);
//     document.addEventListener("mouseleave", handleMouseLeave);

//     return () => {
//       window.removeEventListener("mousemove", handleMouseMove);
//       document.removeEventListener("mouseleave", handleMouseLeave);
//       if (timeoutRef.current) clearTimeout(timeoutRef.current);
//     };
//   }, [mousePosition.x, isVisible]);

//   if (!isVisible) return null;

//   return (
//     <motion.div
//       className="pointer-events-none fixed top-0 left-0 z-[9999] -translate-x-1/2 -translate-y-1/2 select-none"
//       animate={{
//         x: mousePosition.x,
//         y: mousePosition.y,
//         scale: isHovered ? 1.2 : 1,
//       }}
//       transition={{
//         type: "spring",
//         stiffness: 600,
//         damping: 32,
//         mass: 0.1,
//       }}
//     >
//       <div
//         className="relative size-8 sm:size-9 transition-transform duration-100"
//         style={{
//           transform: direction === "left" ? "scaleX(-1)" : "scaleX(1)",
//         }}
//       >
//         <Image
//           src={isMoving ? "/cat-run.gif" : "/cat.png"}
//           alt="Pixel Cat Cursor"
//           fill
//           className="object-contain image-rendering-pixelated"
//           priority
//         />
//       </div>
//     </motion.div>
//   );
// }