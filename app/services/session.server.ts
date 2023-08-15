import { createCookieSessionStorage } from "@remix-run/node";

if (!process.env.COOKIE_SECRET) throw new Error("No Cookie Secret Found!");

export let sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "_session",
    sameSite: "lax",
    path: "/",
    secrets: [process.env.COOKIE_SECRET],
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  },
});

export const { getSession, commitSession, destroySession } = sessionStorage;
