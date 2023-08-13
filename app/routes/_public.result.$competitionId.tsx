import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { findCompetition } from "~/storage/dbOperations.server";

export const loader = async ({ params }: LoaderArgs) =>
  json(await findCompetition(params.competitionId!)); // handle error case

export default function CompetitionResult() {
  const data = useLoaderData<typeof loader>();
  return <p>The winner is: {data.winner?.title}</p>;
}
