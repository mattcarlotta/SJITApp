import { connectDatabase } from "database";
import { User, Team } from "models";
import { createRandomToken } from "shared/helpers";
import config from "env";
import teams from "./teams";

const { NODE_ENV, SEED } = process.env;

const { admin, staff } = config[NODE_ENV];

/**
 * Function to seed the testing Mongo database.
 *
 * @function
 * @async
 * @returns {string} - displays a:  PASS  utils/seedDB.js message to console.
 * @throws {error} - displays a:  FAIL  utils/seedDB.js message to console with the error.
 */
(async () => {
  const db = connectDatabase();
  try {
    const adminPassword = await User.createPassword(admin.password);

    const administrator = {
      ...admin,
      password: adminPassword,
      role: "admin",
      token: createRandomToken(),
    };

    const staffPassword = await User.createPassword(staff.password);

    const staffMember = {
      ...staff,
      password: staffPassword,
      role: "staff",
      token: createRandomToken(),
    };

    await User.insertMany([administrator, staffMember]);

    await Team.insertMany(teams);

    await db.close();

    return console.log(
      "\n\x1b[7m\x1b[32;1m PASS \x1b[0m \x1b[2mutils/\x1b[0m\x1b[1mseedProd.js",
    );
  } catch (err) {
    return console.log(
      `\n\x1b[7m\x1b[31;1m FAIL \x1b[0m \x1b[2mutils/\x1b[0m\x1b[31;1mseedDB.js\x1b[0m\x1b[31m\n${err.toString()}\x1b[0m`,
    );
  } finally {
    process.exit(0);
  }
})();
