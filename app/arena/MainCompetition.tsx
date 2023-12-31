import { Form } from "@remix-run/react";
import {
  ArtCombatant,
  assertArtCombatants,
  type IArtCombatant,
} from "./ArtCombatant";
import { useState } from "react";

interface MainCompetitionProps {
  arts: [IArtCombatant, IArtCombatant];
  competitionId: string;
}

interface ArtContainerProps {
  art: IArtCombatant;
  competitionId: string;
}

export function MainCompetition({ arts, competitionId }: MainCompetitionProps) {
  return (
    <main className="arena">
      {arts.map((art: IArtCombatant) => (
        <ArtContainer key={art.id} art={art} competitionId={competitionId} />
      ))}
    </main>
  );
}

export function ArtContainer({ art, competitionId }: ArtContainerProps) {
  const [active, setActive] = useState(false);
  return (
    <div
      className={`artContainer ${active ? "active" : ""}`}
      onClick={() => setActive(!active)}
      onMouseOut={() => active && setActive(false)}
    >
      <ArtCombatant art={art} />
      <Form method="post" action="/battle">
        <input hidden readOnly name="competitionId" value={competitionId} />
        <input hidden readOnly name="artId" value={art.id} />
        <input type="submit" className="voteButton" value="Vote" />
      </Form>
    </div>
  );
}

export function assertDataForCompetition(data: {
  arts: IArtCombatant[];
  competitionId: string;
}): asserts data is {
  arts: [IArtCombatant, IArtCombatant];
  competitionId: string;
} {
  if (!data.competitionId) throw new Error("No competition id provided");
  if (data.arts?.length !== 2) throw new Error("Does not include 2 arts");
  assertArtCombatants(data.arts);
}
