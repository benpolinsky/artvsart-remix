import { NavLink } from "@remix-run/react";
import ghlogo from "~/assets/github-mark.png";

export function FrontHeader() {
  return (
    <header id="main">
      <nav>
        <NavLink to="/">Art vs Art</NavLink>
        <NavLink to="/battle">Battle</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink
          to="https://github.com/benpolinsky/artvsart-remix"
          target="_blank"
        >
          <img src={ghlogo} alt="github-octocat-logo" height="30" />
        </NavLink>
      </nav>
    </header>
  );
}
