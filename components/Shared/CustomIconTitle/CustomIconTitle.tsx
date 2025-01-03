import { cn } from "@/lib";
import { iCustomIconTitle } from "@/types";

export function CustomIconTitle(props: iCustomIconTitle) {
  const {className,icon:Icon, titleDark, titleLight} = props

    return (
    <div className="flex items-center gap-2">
        <div className="p-2 bg-slate-300/10 rounded-lg">
            <Icon className={cn(`w-16 h-16 ${className}`)} strokeWidth={2}/>
        </div>
        <div className="flex flex-col uppercase text-blueDarkInka">
            <p className="text-3xl font-headBold">{titleDark}</p>
            <p className="text-2xl font-headLight">{titleLight}</p>
        </div>
    </div>
  )
}
