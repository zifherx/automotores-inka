"use client";

import { IconTextProp } from "@/types";

export function IconText({ icon: Icon, text }: IconTextProp) {
  return (
    <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
      <Icon className="w-5 h-5" />
      <span>{text}</span>
    </div>
  );
}
