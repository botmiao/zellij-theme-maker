import type React from "react";

interface TabButtonProps {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}

export default function TabButton({
  children,
  active,
  onClick,
}: TabButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 py-2 text-sm font-medium transition-colors ${
        active
          ? "border-b-2 border-blue-500 text-blue-500"
          : "text-gray-400 hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}
