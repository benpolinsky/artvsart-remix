import { Outlet } from "@remix-run/react";
import { FrontFooter } from "~/layout/FrontFooter";
import { FrontHeader } from "~/layout/FrontHeader";
import layoutStyles from "~/styles/layout.css";
import headerNavStyles from "~/styles/headerNav.css";
import homeStyles from "~/styles/home.css";
import artStyles from "~/styles/art.css";
import { addStyleSheets } from "~/utils/helpers";

export const links = addStyleSheets([
  layoutStyles,
  headerNavStyles,
  homeStyles,
  artStyles,
]);

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
