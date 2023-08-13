import { NavLink, Outlet } from "@remix-run/react";

export default function ArtsLayout() {
  return (
    <>
      <div className="layout-container">
        <SecondaryNav />
        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
}

function SecondaryNav() {
  return (
    <header className="subheader">
      <nav id="secondary">
        <NavLink to="/dashboard/arts/addBulk">Add Bulk Arts</NavLink>
        <NavLink to="/dashboard/arts/find">Find via OpenAI API</NavLink>
      </nav>
    </header>
  );
}
