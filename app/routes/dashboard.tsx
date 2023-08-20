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
import type { Administrator } from "~/administration/types";
import { AssertionError } from "assert";

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
  const data = useLoaderData<typeof loader>();
  assertAdmin(data);

  return (
    <>
      <DashboardHeader admin={data.admin} />
      <Outlet context={{ admin: data.admin }} />
    </>
  );
}

// No idea why this isn't enough for Remix's types.. again really annoying
// not super psyched about fighting against this and prisma controlling all my types
// and then being a pain trying to get some separation.

// Couldn't find a way to assert around SerializableObject<UndefinedToOptional<>>
// unless I use the above `as {admin: Administrator|null}`
// Maybe need to learn more, maybe a bug in remix 2.x :)

function assertAdmin(data: {
  admin: Administrator;
}): asserts data is { admin: Administrator } {
  if (!data) throw new AssertionError({ message: "Admin is not fully formed" });
  if (!data.admin)
    throw new AssertionError({ message: "Admin is not fully formed" });
  if (!data.admin.email) throw new Error();
  if (!data.admin.id) throw new Error();
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
