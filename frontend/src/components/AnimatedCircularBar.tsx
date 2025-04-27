import React, { useEffect, useRef, useState } from "react";

interface AnimatedCircularBarProps {
  percentage: number;
  size?: number; // SVG size in px
  strokeWidth?: number; // Stroke width in px
  duration?: number; // Animation duration in ms
}

const AnimatedCircularBar: React.FC<AnimatedCircularBarProps> = ({
  percentage,
  size = 96,
  strokeWidth = 12,
  duration = 2000,
}) => {
  const [progress, setProgress] = useState(0);
  const animationRef = useRef<number | null>(null);
  const isAnimating = useRef(false)

  // Animate progress from a given value to a target
  const animateTo = (from: number, to: number) => {
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    const start = performance.now();
    const step = (now: number) => {
      const elapsed = now - start;
      const t = Math.min(elapsed / duration, 1);
      const value = from + (to - from) * t;
      setProgress(value);
      if (t < 1) {
        animationRef.current = requestAnimationFrame(step);
        isAnimating.current = true;
      } else {
        setProgress(to);
        isAnimating.current = false;
      }
    };
    animationRef.current = requestAnimationFrame(step);
  };

  // On mount or percentage change, animate from 0 to percentage
  useEffect(() => {
    animateTo(0, percentage);
    return () => {
      if (animationRef.current){
         cancelAnimationFrame(animationRef.current);
         isAnimating.current = false;
        }
    };
    // eslint-disable-next-line
  }, [percentage]);

  // On hover, animate from 0 to percentage
  const handleMouseEnter = () => {
   if(!isAnimating.current) animateTo(0, percentage);
  };


  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const dash = Math.max(0, Math.min(progress, 100)) * (circumference / 100);

  let color = "#ef4444"; // red-500
  if (percentage >= 70) color = "#22c55e"; // green-500
  else if (percentage >= 40) color = "#f59e42"; // amber-500

  return (
    <div
      className="relative select-none p-2 "
      style={{ width: size, height: size }}
      onMouseEnter={handleMouseEnter}
    >
      <svg
        className="w-full h-full transform -rotate-90"
        viewBox={`0 0 ${size} ${size}`}
      >
        <circle
          className="text-gray-700"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          style={{ transition: 'stroke 0.3s' }}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference}`}
          strokeDashoffset={circumference - dash}
          strokeLinecap="round"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>
      <div
        className="absolute top-1/2 left-1/2 flex flex-col items-center justify-center"
        style={{
          transform: 'translate(-50%, -50%)',
          width: size * 0.7,
          height: size * 0.7,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span
          className="font-bold"
          style={{ fontSize: size * 0.21, lineHeight: 1, color: 'white' }}
        >
          {Math.round(progress)}%
        </span>
      </div>
    </div>
  );
};

export default AnimatedCircularBar;