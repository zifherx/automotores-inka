import { BtnAddContest } from "../BtnAddContest";
import { ListContest } from "../ListContest";

import { iListContest } from "@/types";

export function ContestDashboardPage(props: iListContest) {
  const { contests } = props;
  return (
    <div>
      <div className="flex justify-between mb-5">
        <h2 className="flex items-center gap-1 text-xl md:text-3xl font-headMedium">
          Gestión de Concursos -{" "}
          {contests.length === 0 ? <p>nulo 😭</p> : <p>{contests.length} 😍</p>}
        </h2>
        <BtnAddContest/>
      </div>
      <ListContest contests={contests} />
    </div>
  );
}
