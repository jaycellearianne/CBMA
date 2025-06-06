import React from "react";

interface IconProps {
  path: string;
  size?: number;
  color?: string;
}

const Icon: React.FC<IconProps> = ({
  path,
  size = 24,
  color = "currentColor",
}) => {
  return (
    <svg
      className="w-6 h-6 text-gray-800 dark:text-white"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d={path}
      />
    </svg>
  );
};

export default Icon;
