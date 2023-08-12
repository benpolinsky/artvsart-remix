import { NavLink } from "@remix-run/react";

export function FrontHeader() {
  return (
    <header>
      <nav>
        <NavLink to="/">Art vs Art</NavLink>
        <NavLink to="/battle">Battle</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="https://github.com/benpolinsky" target="_blank">
          GH Logo
        </NavLink>
      </nav>
    </header>
  );
}
