
interface RecipeIconProps {
  readonly className?: string;
}

export default function RecipeIcon({ className }: RecipeIconProps) {
  return (
    <svg className={className ?? "h-4 w-4"} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 2H5V22H3V2ZM19 2H6V22H19C20.103 22 21 21.103 21 20V4C21 2.897 20.103 2 19 2ZM18 12H9V10H18V12ZM18 8H9V6H18V8Z" fill="currentColor"/>
    </svg>
  );
}