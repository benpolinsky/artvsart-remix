import { NavLink } from "@remix-run/react";
import type { Administrator } from "~/administration/types";

interface DashboardHeaderProps {
  admin: Administrator;
}

export function DashboardHeader({ admin }: DashboardHeaderProps) {
  return (
    <header id="main">
      <nav>
        <NavLink to="/dashboard/arts">Arts</NavLink>
        <NavLink to="/dashboard/battles">Battles</NavLink>
        <NavLink to="/dashboard/users">Users</NavLink>
        <p>User Signed in: {admin.email}</p>
        <NavLink to="/" target="_blank">
          Front
        </NavLink>
      </nav>
    </header>
  );
}
