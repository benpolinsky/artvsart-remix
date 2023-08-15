import type { ActionArgs } from "@remix-run/node";
import { adminAuthenticator } from "~/services/auth.server";

export const action = async ({ request }: ActionArgs) => {
  await adminAuthenticator.authenticate("form", request, {
    successRedirect: "/dashboard",
    failureRedirect: "/administrators/login",
  });
};

export default function AdministratorLoginForm() {
  return (
    <form method="post">
      <span>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" required />
      </span>

      <span>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" required />
      </span>

      <input type="submit" value="Log in" />
    </form>
  );
}
