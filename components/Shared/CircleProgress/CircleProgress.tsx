import { cn } from "@/lib/utils";
import { iCircleProgress } from "@/types";

export default function CircleProgress(props: iCircleProgress) {
  const { value, className } = props;

  const circumference = 2 * Math.PI * 38;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <svg
      className={cn(`transform -rotate-90`, className)}
      viewBox="0 0 100 100"
    >
      <circle
        className="text-gray-200"
        strokeWidth="8"
        stroke="currentColor"
        fill="transparent"
        r="38"
        cx="50"
        cy="50"
      />
      <circle
        className="text-redInka"
        strokeWidth="8"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
        stroke="currentColor"
        fill="transparent"
        r="38"
        cx="50"
        cy="50"
      />
    </svg>
  );
}
