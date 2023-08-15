import { PrismaClient } from "@prisma/client";
import { ok } from "assert";
import { hashSync } from "bcrypt";
import { config } from "dotenv";

config();

const email = process.env.ADMIN_USERNAME;
const password = process.env.ADMIN_PASSWORD;
const db = new PrismaClient();

async function adminExists() {
  ok(email, "Email is not present");
  const user = await db.administrator.findFirst({ where: { email } });
  return !!user;
}

async function createAdmin(email: string, password: string) {
  const hashedPassword = hashSync(password, 5);
  await db.administrator
    .create({
      data: {
        email,
        hashedPassword,
      },
    })
    .then(() => {
      console.log("Administrator Created");
    });
}

async function run() {
  ok(email, "Email is not present");
  ok(password, "Password is not present");

  db.$connect();

  const alreadyExists = await adminExists();
  if (alreadyExists) {
    console.log("Admin present, good to go.");
    return;
  }

  await createAdmin(email, password);
}

run().then(() => console.log("Done"));
