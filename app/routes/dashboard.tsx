import type { LinksFunction } from "@remix-run/node";
import { NavLink, Outlet } from "@remix-run/react";
import stylesUrl from "~/styles/index.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesUrl },
];

export default function MainRoute() {
  return (
    <>
      <DashboardHeader />
      <Outlet />
    </>
  );
}

function DashboardHeader() {
  return (
    <header>
      <nav>
        <NavLink to="/dashboard/arts">Arts</NavLink>
      </nav>
    </header>
  );
}
