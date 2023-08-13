import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { findCompetitions } from "~/storage/dbOperations.server";

export const loader = async () => {
  return json({
    competitions: await findCompetitions(true),
  });
};

export default function Battles() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="layout-container">
      <ul>
        {data.competitions.map((comp) => (
          <li key={comp.id}>
            {comp.homeArt.title} vs {comp.awayArt.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
