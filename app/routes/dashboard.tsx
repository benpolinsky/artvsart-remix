import { Outlet } from "@remix-run/react";
import { DashboardHeader } from "~/layout/dashboard/DashboardHeader";
import { addStyleSheets } from "~/utils/helpers";
import dashboardStyles from "~/styles/dashboard.css";
import headerNavStyles from "~/styles/headerNav.css";

export const links = addStyleSheets([dashboardStyles, headerNavStyles]);

export default function Dashboard() {
  return (
    <>
      <DashboardHeader />
      <Outlet />
    </>
  );
}
