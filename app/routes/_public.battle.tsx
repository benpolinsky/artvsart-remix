import type { ActionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Competition } from "~/arena/Competition";
import { ErrorBag } from "~/utils/errors";
import {
  MainCompetition,
  assertDataForCompetition,
} from "~/arena/MainCompetition";

export const action = async ({ request }: ActionArgs) => {
  const formData = await request.formData();
  const winnerId = formData.get("artId")?.toString();
  const competitionId = formData.get("competitionId")?.toString();

  const errorBag = new ErrorBag();
  if (!competitionId) {
    errorBag.add("competitionId", "Does not exist");
    return errorBag.response();
  }

  const competition = new Competition();
  await competition.load(competitionId);

  if (!winnerId) {
    errorBag.add("winnerId", "No winner!");
    return errorBag.response();
  }

  await competition.setWinner(winnerId);

  return redirect(`/result/${competitionId}`);
};

export const loader = async () => json(await new Competition().prepare());

export default function Battle() {
  const data = useLoaderData<typeof loader>();
  assertDataForCompetition(data);

  return (
    <MainCompetition arts={data.arts} competitionId={data.competitionId} />
  );
}
