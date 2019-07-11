/* eslint-disable no-console */
import { connectDatabase } from "database";
import { User } from "models";
import config from "env";

const { NODE_ENV, WATCHING } = process.env;

const { admin, password } = config[NODE_ENV];

const seedDB = async () => {
  const db = connectDatabase();
  try {
    const adminPassword = await User.createPassword(password);

    const administrator = {
      email: admin,
      password: adminPassword,
      firstName: "Matt",
      lastName: "Carlotta",
      role: "admin",
    };

    const memberPassword = await User.createPassword(password);

    const member = {
      email: "member@example.com",
      password: memberPassword,
      firstName: "Member",
      lastName: "Member",
      role: "member",
    };

    await User.create(administrator);
    await User.create(member);
    await db.close();

    return console.log(
      "\n\x1b[7m\x1b[32;1m PASS \x1b[0m \x1b[2mutils/\x1b[0m\x1b[1mseedDB.js",
    );
  } catch (err) {
    return console.log(
      `\n\x1b[7m\x1b[31;1m FAIL \x1b[0m \x1b[2mutils/\x1b[0m\x1b[31;1mseedDB.js\x1b[0m\x1b[31m\n${err.toString()}\x1b[0m`,
    );
  } finally {
    if (!WATCHING) {
      await db.close();
      process.exit(0);
    }
  }
};

export default seedDB;
/* eslint-enable no-console */
