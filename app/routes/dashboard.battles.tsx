import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { CompetitionDatabaseProperties } from "~/storage/db.types";
import { findCompetitions } from "~/storage/dbOperations.server";

export const loader = async () => {
  return json({
    competitions: await findCompetitions(true),
  });
};

export default function Battles() {
  const data = useLoaderData<{
    competitions: CompetitionDatabaseProperties[];
  }>();
  assertData(data);
  const competitions = data.competitions;
  assertCompetitions(competitions);

  return (
    <div className="layout-container">
      <ul>
        {competitions.map((comp) => (
          <li key={comp.id}>
            {comp.homeArt.title} vs {comp.awayArt.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

function assertData(
  data: any
): asserts data is { competitions: CompetitionDatabaseProperties[] } {
  if (!data) throw new Error("No data");
}

function assertCompetitions(
  competitions: CompetitionDatabaseProperties[]
): asserts competitions is CompetitionDatabaseProperties[] {
  if (!competitions?.length) throw new Error("No competitions");
}
