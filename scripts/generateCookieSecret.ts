import { randomBytes } from "crypto";

function generateCookieSecret() {
  return randomBytes(30).toString("ascii");
}

console.log(`Your secret is: ${generateCookieSecret()}`);
