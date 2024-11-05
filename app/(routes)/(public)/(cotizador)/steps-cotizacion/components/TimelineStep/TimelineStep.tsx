import { cn } from "@/lib";
import { tTimelineStep } from "@/types";

export function TimelineStep(props : tTimelineStep) {
  const { isActive,number,title} = props
    return (
    <div className={cn("flex flex-col items-center bg-transparent", isActive ? 'text-blueInka' : 'text-muted-foreground')}>
        <div className={cn("w-12 h-12 rounded-full flex items-center justify-center text-2xl border border-blueInka", isActive ? 'bg-blueInka text-primary-foreground' : 'bg-muted text-blueInka')}>
            {number}
        </div>
        <div className="absolute mt-14 text-sm font-medium text-center">{title}</div>
    </div>
  )
}
