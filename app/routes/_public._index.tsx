import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Competition } from "~/arena/Competition";

import {
  MainCompetition,
  assertDataForCompetition,
} from "~/arena/MainCompetition";

const competition = new Competition();

export const loader = async () => json(await competition.prepare());

export default function Home() {
  const data = useLoaderData<typeof loader>();
  assertDataForCompetition(data);
  return (
    <>
      <h1 className="mainTitle">ART vs ART</h1>
      <MainCompetition arts={data.arts} competitionId={data.competitionId} />
    </>
  );
}
