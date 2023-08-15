import {
  Link,
  Outlet,
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import { DashboardHeader } from "~/layout/dashboard/DashboardHeader";
import { addStyleSheets } from "~/utils/helpers";
import dashboardStyles from "~/styles/dashboard.css";
import headerNavStyles from "~/styles/headerNav.css";
import { adminAuthenticator } from "~/services/auth.server";
import type { LoaderArgs, V2_MetaArgs, V2_MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
export const meta: V2_MetaFunction = ({ data }: V2_MetaArgs) => {
  return [
    {
      title: "Art dash",
    },
  ];
};
export const links = addStyleSheets([dashboardStyles, headerNavStyles]);

export const loader = async ({ request }: LoaderArgs) => {
  const admin = await adminAuthenticator.isAuthenticated(request, {
    failureRedirect: "/administrators/login",
  });

  return json({ admin });
};

export default function Dashboard() {
  const { admin } = useLoaderData<typeof loader>();
  assertAdmin(admin);

  return (
    <>
      <DashboardHeader admin={admin} />
      <Outlet context={{ admin }} />
    </>
  );
}

function assertAdmin(admin: any) {
  if (!admin?.email || !admin?.id) throw new Error("Admin is not fully formed");
}

// This is not working (the root error boundary is catching instead), I will circle back and figure it out.
// https://github.com/remix-run/remix/discussions/6086
export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>Oops</h1>
        <p>Status: {error.status}</p>
        <p>{error.data.message}</p>
        <Link to="/dashboard">Back to dashboard home</Link>
      </div>
    );
  }

  let errorMessage = "";

  if (error) {
    errorMessage = (error as Error)?.message
      ? (error as Error)?.message
      : typeof error === "string"
      ? error
      : "Unknown error";
  }

  return (
    <div>
      <h1>That's not an error, it was intentional right... right?</h1>
      <p>Something went wrong.</p>
      <pre>{errorMessage}</pre>
      <Link to="/dashboard">Back to dashboard home</Link>
    </div>
  );
}
