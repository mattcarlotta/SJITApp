/* eslint-disable no-console */
import { User } from "models";
import config from "env";

const { NODE_ENV } = process.env;

const { admin, password } = config[NODE_ENV];

const seedAdmin = async () => {
  try {
    await User.deleteMany({});
    const newPassword = await User.createPassword(password);

    const administrator = {
      email: admin,
      password: newPassword,
      firstName: "Matt",
      lastName: "Carlotta",
      role: "admin",
    };

    await User.create(administrator);

    console.log(
      "\n\x1b[7m\x1b[32;1m PASS \x1b[0m \x1b[2mutils/\x1b[0m\x1b[1madmin.js",
    );
  } catch (err) {
    console.log(
      `\n\x1b[7m\x1b[31;1m FAIL \x1b[0m \x1b[2mutils/\x1b[0m\x1b[31;1madmin.js\x1b[0m\x1b[31m\n${err.toString()}\x1b[0m`,
    );
  }
};

export default seedAdmin;
/* eslint-enable no-console */
