import { Form } from "@remix-run/react";
import { ArtCombatant, type IArtCombatant } from "./ArtCombatant";

interface MainCompetitionProps {
  arts: [IArtCombatant, IArtCombatant];
  competitionId: string;
}

export function assertDataForCompetition(data: {
  arts?: IArtCombatant[];
  competitionId?: string;
}): [[IArtCombatant, IArtCombatant], string] {
  if (!data.competitionId) throw new Error("No competition id provided");
  if (data.arts?.length !== 2) throw new Error("Does not include 2 arts"); // Would love this to narrow ts

  data.arts.forEach((art) => {
    if (!art?.id || !art?.title || !art?.creator || !art.id) {
      throw new Error("Art is not fully formed");
    }
  });

  return [data.arts as [IArtCombatant, IArtCombatant], data.competitionId];
}

export function MainCompetition({ arts, competitionId }: MainCompetitionProps) {
  return (
    <main className="arena">
      {arts.map((art: IArtCombatant) => (
        <Form method="post" action="/battle" key={art.id}>
          <ArtCombatant art={art} />
          <input hidden readOnly name="competitionId" value={competitionId} />
          <input hidden readOnly name="artId" value={art.id} />
          <input type="submit" value="Vote" />
        </Form>
      ))}
    </main>
  );
}
