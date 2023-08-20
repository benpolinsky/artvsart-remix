import { json } from "@remix-run/node";
import { NavLink, useLoaderData } from "@remix-run/react";
import type { ArtDatabaseProperties } from "~/storage/db.types";

import { getAllArt } from "~/storage/dbOperations.server";

export const loader = async () =>
  json({
    arts: await getAllArt(["title"]),
  });

export default function ArtsIndex() {
  const data = useLoaderData<{ arts: ArtDatabaseProperties[] }>();
  assertData(data);

  return (
    <div className="sidebar">
      <ul>
        {data.arts.map((art) => (
          <li key={art.id}>
            <NavLink to={`/dashboard/arts/${art.id}`}>{art.title}</NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

// just feels verrrry inconsistent
// what is the difference between this and
// assert data in the dash/compid route... why is this not narrowed?
function assertData(data: any): asserts data is { arts: any } {
  if (!data) throw new Error("No data");
}
