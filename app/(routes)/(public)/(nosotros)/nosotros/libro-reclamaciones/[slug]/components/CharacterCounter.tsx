import { CharacterCounterProp } from "@/types";

export function CharacterCounter({
  current,
  max,
  label = "Máximo",
}: CharacterCounterProp) {
  return (
    <div className="flex justify-between text-sm text-gray-500">
      <span>
        {label} {max} caracteres
      </span>
      <span className={current > max ? "text-redInka" : ""}>
        {current}/{max}
      </span>
    </div>
  );
}
