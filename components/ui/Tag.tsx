"use client";

interface TagProps {
  tag: string;
  onClick?: (tag: string) => void;
  isActive?: boolean;
  className?: string;
}

export const Tag = ({
  tag,
  onClick,
  isActive = false,
  className = "",
}: TagProps) => {
  return (
    <span
      onClick={() => onClick?.(tag)}
      className={`
        tag-item 
        ${onClick ? "cursor-pointer" : ""}
        transition-colors duration-200
        hover:bg-indigo hover:text-white
        ${isActive ? "bg-indigo text-white" : "text-indigo"}
        ${className}
      `}
    >
      {tag}
    </span>
  );
};
