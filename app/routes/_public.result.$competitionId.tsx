import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import type { IArtCombatant } from "~/arena/ArtCombatant";
import { ArtCombatant, assertArtCombatant } from "~/arena/ArtCombatant";
import { findCompetition } from "~/storage/dbOperations.server";
import { addStyleSheets } from "~/utils/helpers";
import artStyles from "~/styles/art.css";
import competitionResult from "~/styles/competitionResult.css";

export const links = addStyleSheets([artStyles, competitionResult]);

export const loader = async ({ params }: LoaderArgs) =>
  json(await findCompetition(params.competitionId!)); // handle error case

export default function CompetitionResult() {
  const data = useLoaderData<{ data: { winner: IArtCombatant } }>();
  assertData(data);
  const winner = data.winner;
  assertArtCombatant(winner);

  return (
    <div className="competitionResult">
      <p className="resultTitle">The winner is:</p>
      <ArtCombatant art={winner} />
      <Link className="voteButton" to={"/battle"}>
        Next battle!
      </Link>
    </div>
  );
}

// again beef with ts assertions... this could be totally wrong but TS 'is satisfied'
function assertData(data: any): asserts data is { winner: any } {
  if (!data?.winner) throw new Error("No data");
}
