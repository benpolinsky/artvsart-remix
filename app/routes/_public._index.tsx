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
  const [arts, competitionId] = assertDataForCompetition(data);
  return (
    <>
      <h1>home</h1>
      <div>About this machine</div>
      <main>
        <MainCompetition arts={arts} competitionId={competitionId} />
      </main>
    </>
  );
}
