import {
  Link,
  Links,
  LiveReload,
  Outlet,
  Scripts,
  isRouteErrorResponse,
  useRouteError,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";
import stylesUrl from "~/styles/global.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesUrl },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Nunito Sans&display=swap",
  },
];

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <title>Art vs Art 2</title>
        <Links />
      </head>
      <body>
        <Outlet />
        <LiveReload />
        <Scripts />
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>Oops</h1>
        <p>Status: {error.status}</p>
        <p>{error.data.message}</p>
        <Link to="/">Head back home</Link>
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
    </div>
  );
}
