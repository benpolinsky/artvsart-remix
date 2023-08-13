import type { ActionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useActionData, useLoaderData } from "@remix-run/react";
import {
  prepCompetition,
  type ArtCombatant,
  setCompetitionWinner,
} from "~/arena/Competition";
import { ErrorBag } from "~/utils/errors";
import { addStyleSheets } from "~/utils/helpers";
import homeStyles from "~/styles/home.css";

export const links = addStyleSheets(homeStyles);

export const action = async ({ request }: ActionArgs) => {
  const formData = await request.formData();
  const winnerId = formData.get("artId")?.toString();
  const competitionId = formData.get("competitionId")?.toString();

  const errorBag = new ErrorBag();
  if (!competitionId) {
    errorBag.add("competitionId", "Does not exist");
    return { ...errorBag.response(), status: 400 };
  }

  if (!winnerId) {
    errorBag.add("winnerId", "No winner!");
    return { ...errorBag.response(), status: 400 };
  }

  await setCompetitionWinner(competitionId, winnerId);

  return redirect(`/result/${competitionId}`);
};

export const loader = async () => json(await prepCompetition());

export default function Home() {
  return (
    <>
      <h1>home</h1>
      <div>About this machine</div>
      <main>
        <Competition />
      </main>
    </>
  );
}

export function Competition() {
  const data = useLoaderData<typeof loader>();
  const actionData = useActionData<{ winnerId: string }>();
  assertArtForCompetition(data.arts);

  return (
    <main className="arena">
      {data.arts.map((art: ArtCombatant) => (
        <Form method="post" action="/?index" key={art.id}>
          <div className="artCombatant">
            <h1>{art.title}</h1>
            {actionData?.winnerId ? "WINNER!!" : ""}
            <input
              hidden
              readOnly
              name="competitionId"
              value={data.competitionId}
            />
            <input hidden readOnly name="artId" value={art.id} />
            <input type="submit" value="Vote" />
          </div>
        </Form>
      ))}
    </main>
  );
}

function assertArtForCompetition(arts: ArtCombatant[]) {
  arts.forEach((art) => {
    if (!art?.id || !art?.title || !art?.creator || !art.id) {
      throw new Error("Art is not fully formed");
    }
  });
}
