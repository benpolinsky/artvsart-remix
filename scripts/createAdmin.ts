import { PrismaClient } from "@prisma/client";
import { ok } from "assert";
import { hashSync } from "bcrypt";

// create administrator
const email = process.argv[2];
const password = process.argv[3];

ok(email, "Email is not present");
ok(password, "Password is not present");

const db = new PrismaClient();
db.$connect();

const hashedPassword = hashSync(password, 5);

db.administrator
  .create({
    data: {
      email,
      hashedPassword,
    },
  })
  .then((res) => {
    console.log("Administrator Created");
  });
