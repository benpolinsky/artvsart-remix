import { Authenticator } from "remix-auth";
import { sessionStorage } from "~/services/session.server";
import { FormStrategy } from "remix-auth-form";
import { compare } from "bcrypt";
import assert from "assert";
import { db } from "~/storage/db.server";
import type { Administrator } from "~/administration/types";

export const adminAuthenticator = new Authenticator<Administrator>(
  sessionStorage
);

adminAuthenticator.use(
  new FormStrategy(async ({ form, context }) => {
    const email = form.get("email"); // or email... etc
    const password = form.get("password");

    assert(typeof email === "string", "username must be a string");
    assert(email.length > 0, "username must not be empty");

    assert(typeof password === "string", "password must be a string");
    assert(password.length > 0, "password must not be empty");

    const admin = await db.administrator.findFirst({
      where: { email },
    });

    const storedPass = admin?.hashedPassword;
    if (!storedPass) throw new Error("No access");

    const validated = await compare(password, storedPass);

    if (!validated) throw new Error("No access");

    return { ...admin, hashedPassword: null };
  })
);
