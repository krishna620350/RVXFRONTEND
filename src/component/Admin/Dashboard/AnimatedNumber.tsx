import React, { useEffect, useRef, useState } from "react";

interface AnimatedNumberProps {
  value: number;
  duration?: number; // ms
  className?: string;
}

const AnimatedNumber: React.FC<AnimatedNumberProps> = ({ value, duration = 1200, className }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const startValue = useRef(0);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    const start = startValue.current;
    const end = value;
    const startTime = performance.now();

    function animate(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const current = Math.floor(start + (end - start) * progress);
      setDisplayValue(current);
      if (progress < 1) {
        raf.current = requestAnimationFrame(animate);
      } else {
        startValue.current = end;
      }
    }
    if (raf.current !== null) {
      cancelAnimationFrame(raf.current);
    }
    animate(performance.now());
    return () => {
      if (raf.current !== null) {
        cancelAnimationFrame(raf.current);
      }
    };
  }, [value, duration]);

  // Render as number lock style (each digit animates), but no background, same font as before
  const digits = displayValue.toString().padStart(value.toString().length, "0").split("");
  return (
    <span className={className || ""}>
      {digits.map((digit, i) => (
        <span
          key={i}
          className="inline-block transition-all duration-200"
          style={{ minWidth: "1.5ch", textAlign: "center" }}
        >
          {digit}
        </span>
      ))}
    </span>
  );
};

export default AnimatedNumber;
