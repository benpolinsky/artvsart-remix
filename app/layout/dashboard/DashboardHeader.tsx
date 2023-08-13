import { NavLink } from "@remix-run/react";

export function DashboardHeader() {
  return (
    <header id="main">
      <nav>
        <NavLink to="/dashboard/arts">Arts</NavLink>
        <NavLink to="/dashboard/battles">Battles</NavLink>
        <NavLink to="/dashboard/users">Users</NavLink>
        <NavLink to="/" target="_blank">
          Front
        </NavLink>
      </nav>
    </header>
  );
}
