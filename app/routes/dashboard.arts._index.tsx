import { json } from "@remix-run/node";
import { NavLink, useLoaderData } from "@remix-run/react";
import { getAllArt } from "~/storage/dbOperations.server";

export const loader = async () =>
  json({
    arts: await getAllArt(["title"]),
  });

export default function ArtsIndex() {
  const data = useLoaderData<typeof loader>();

  return (
    <>
      <div className="sidebar">
        <ul>
          {data.arts.map((art) => (
            <li key={art.id}>
              <NavLink to={`/dashboard/arts/${art.id}`}>{art.title}</NavLink>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
