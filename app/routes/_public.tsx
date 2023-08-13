import { Outlet } from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";
import { FrontFooter } from "~/layout/FrontFooter";
import { FrontHeader } from "~/layout/FrontHeader";
import layoutStyles from "~/styles/layout.css";
import headerNavStyles from "~/styles/headerNav.css";

export const links: LinksFunction = () => [
  {
    rel: "stylesheet",
    href: layoutStyles,
  },
  {
    rel: "stylesheet",
    href: headerNavStyles,
  },
  {
    rel: "preconnect",
    href: "https:fonts/gstatic.com",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Nunito Sans&display=swap",
  },
];

export default function FrontLayout() {
  return (
    <>
      <FrontHeader />
      <div className="home-wrapper">
        <Outlet />
      </div>
      <FrontFooter />
    </>
  );
}
