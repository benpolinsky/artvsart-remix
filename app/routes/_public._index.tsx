import { addStyleSheets } from "~/utils/helpers";
import homeStyles from "~/styles/home.css";
import type { ActionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useActionData, useFetcher, useLoaderData } from "@remix-run/react";
import { prepCompetition, type ArtCombatant } from "~/arena/Competition";

export const links = addStyleSheets(homeStyles);

export const action = async ({ request }: ActionArgs) => {
  console.log((await request.formData()).get("artId"));
  return null;
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
  const fetcher = useFetcher(); // use for more app-like experience, but we could redirect to the competition result

  const data = useLoaderData<typeof loader>();
  const actionData = useActionData();
  assertArtForCompetition(data.arts);

  return (
    <main className="arena">
      {data.arts.map((art: ArtCombatant) => (
        <fetcher.Form method="post" action="/?index" key={art.id}>
          <div className="artCombatant">
            <h1>{art.title}</h1>
            <input
              hidden
              readOnly
              name="competitionId"
              value={data.competitionId}
            />
            <input hidden readOnly name="artId" value={art.id} />
            <input type="submit" value="Vote" />
          </div>
        </fetcher.Form>
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
