import { json } from "@remix-run/node";
import { NavLink, useLoaderData } from "@remix-run/react";
import { db } from "~/storage/db.server";

export const loader = async () =>
  json({
    arts: await db.art.findMany({ select: { id: true, title: true } }),
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
