import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { ArtCombatant } from "~/arena/ArtCombatant";
import { findCompetition } from "~/storage/dbOperations.server";
import { addStyleSheets } from "~/utils/helpers";
import artStyles from "~/styles/art.css";

export const links = addStyleSheets(artStyles);

export const loader = async ({ params }: LoaderArgs) =>
  json(await findCompetition(params.competitionId!)); // handle error case

export default function CompetitionResult() {
  const data = useLoaderData<typeof loader>();
  if (!data.winner) return null; // again error handling

  return (
    <div>
      The winner is: <ArtCombatant art={data.winner} />
      <Link to={"/battle"}>Try another match</Link>
    </div>
  );
}
