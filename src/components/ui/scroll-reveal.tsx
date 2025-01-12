"use client";
import { useEffect, useRef, ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  animation?: "fade-up" | "fade-down" | "fade-left" | "fade-right" | "zoom" | "flip";
  delay?: number;
}

export function ScrollReveal({ children, animation = "fade-up", delay = 0 }: ScrollRevealProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("animate-in");
            }, delay);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
      }
    );

    const element = elementRef.current;
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [delay]);

  const getAnimationClass = () => {
    switch (animation) {
      case "fade-up":
        return "opacity-0 translate-y-8 transition-all duration-700 ease-out data-[state=visible]:opacity-100 data-[state=visible]:translate-y-0";
      case "fade-down":
        return "opacity-0 -translate-y-8 transition-all duration-700 ease-out data-[state=visible]:opacity-100 data-[state=visible]:translate-y-0";
      case "fade-left":
        return "opacity-0 translate-x-8 transition-all duration-700 ease-out data-[state=visible]:opacity-100 data-[state=visible]:translate-x-0";
      case "fade-right":
        return "opacity-0 -translate-x-8 transition-all duration-700 ease-out data-[state=visible]:opacity-100 data-[state=visible]:translate-x-0";
      case "zoom":
        return "opacity-0 scale-95 transition-all duration-700 ease-out data-[state=visible]:opacity-100 data-[state=visible]:scale-100";
      case "flip":
        return "opacity-0 rotateX-90 transition-all duration-700 ease-out data-[state=visible]:opacity-100 data-[state=visible]:rotate-0";
      default:
        return "opacity-0 translate-y-8 transition-all duration-700 ease-out data-[state=visible]:opacity-100 data-[state=visible]:translate-y-0";
    }
  };

  return (
    <div
      ref={elementRef}
      className={getAnimationClass()}
      data-state="hidden"
      onTransitionEnd={(e) => {
        if (e.propertyName === "opacity" && elementRef.current) {
          elementRef.current.dataset.state = "visible";
        }
      }}
    >
      {children}
    </div>
  );
}