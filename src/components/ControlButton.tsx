import React from "react";
import { cn } from "../lib/utils";

interface ControlButtonProps {
  label: string;
  variant?: "primary" | "success" | "danger" | "default";
  onClick: () => void;
}

const ControlButton: React.FC<ControlButtonProps> = ({
  label,
  variant = "default",
  onClick,
}) => {
  const baseClasses =
    "px-4 py-2 text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed";

  const variantClasses = {
    primary:
      "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500",
    success: "bg-green-500 text-white hover:bg-green-600 focus:ring-green-400",
    danger: "bg-red-500 text-white hover:bg-red-600 focus:ring-red-400",
    default: "bg-gray-200 text-gray-700 hover:bg-gray-300 focus:ring-gray-400",
  };

  return (
    <button
      onClick={onClick}
      className={cn(baseClasses, variantClasses[variant])}
    >
      {label}
    </button>
  );
};

export default ControlButton;
