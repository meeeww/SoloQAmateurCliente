// components/Tooltip.tsx
import { useState } from "react";
import type { ReactNode } from "react";

interface TooltipProps {
  text: string;
  children: ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ text, children }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative inline-block" onMouseEnter={() => setIsVisible(true)} onMouseLeave={() => setIsVisible(false)}>
      {children}
      <div
        className={`absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 w-max bg-[#222] text-white text-sm rounded-lg p-2 shadow-lg transition-opacity duration-300 ease-in-out ${
          isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        style={{ transition: "opacity 0.3s ease-in-out" }}
      >
        {text}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-8 border-transparent border-[#222]"></div>
      </div>
    </div>
  );
};

export default Tooltip;
