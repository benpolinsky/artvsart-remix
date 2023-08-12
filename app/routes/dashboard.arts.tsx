import { json } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { db } from "~/storage/db.server";
import artLayoutStyles from "~/styles/artLayout.css";
import { addStyleSheets } from "~/utils/helpers";

export const links = addStyleSheets(artLayoutStyles);

export const loader = async () =>
  json({
    arts: await db.art.findMany({ select: { id: true, title: true } }),
  });

export default function ArtsLayout() {
  return (
    <>
      <h1>Art Vs Art Backend</h1>
      <nav id="main">
        <Link to="/arts">Art Index</Link>
        <Link to="/arts/addBulk">Add Bulk Arts</Link>
        <Link to="/arts/find">Find via OpenAI API</Link>
      </nav>

      <div className="layout-container">
        <SideBar />
        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
}

function SideBar() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="sidebar">
      <ul>
        {data.arts.map((art) => (
          <li key={art.id}>
            <Link to={`/dashboard/arts/${art.id}`}>{art.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
