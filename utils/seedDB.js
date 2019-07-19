/* eslint-disable no-console */
import { connectDatabase } from "database";
import { User, Season, Token } from "models";
import { createSignupToken, createRandomToken } from "shared/helpers";
import config from "env";

const { NODE_ENV, SEED } = process.env;

const { admin, password } = config[NODE_ENV];

/**
 * Function to seed the testing Mongo database.
 *
 * @function
 * @async
 * @returns {string} - displays a:  PASS  utils/seedDB.js message to console.
 * @throws {error} - displays a:  FAIL  utils/seedDB.js message to console with the error.
 */

const seedDB = async () => {
  const db = connectDatabase();
  try {
    const newSeason = {
      seasonId: "20002001",
      startDate: new Date(2000, 9, 6),
      endDate: new Date(2001, 7, 6),
    };

    await Season.create(newSeason);
    const createdSeason = await Season.findOne({
      seasonId: newSeason.seasonId,
    });

    const newHire = {
      authorizedEmail: "member@example.com",
      email: "member@example.com",
      role: "member",
      seasonId: newSeason.seasonId,
      token: createSignupToken(),
    };

    await Token.create(newHire);

    const adminPassword = await User.createPassword(password);

    const administrator = {
      email: admin,
      password: adminPassword,
      firstName: "Matt",
      lastName: "Carlotta",
      role: "admin",
      token: createRandomToken(),
    };

    const memberPassword = await User.createPassword(password);

    const member = {
      email: "member@example.com",
      password: memberPassword,
      firstName: "Member",
      lastName: "Member",
      role: "member",
      token: createRandomToken(),
    };

    const member2 = {
      email: "member2@example.com",
      password: memberPassword,
      firstName: "Member2",
      lastName: "Member2",
      role: "member",
      token: createRandomToken(),
    };

    const member3 = {
      email: "member3@example.com",
      password: memberPassword,
      firstName: "Member3",
      lastName: "Member3",
      role: "member",
      token: createRandomToken(),
    };

    await User.create(administrator);
    await User.create(member);
    await User.create(member2);
    await User.create(member3);

    const newMember = await User.findOne({ email: member.email });
    const newMember2 = await User.findOne({ email: member2.email });
    const newMember3 = await User.findOne({ email: member3.email });

    await Season.addUser(createdSeason._id, newMember._id);
    await Season.addUser(createdSeason._id, newMember2._id);
    await Season.addUser(createdSeason._id, newMember3._id);

    await db.close();

    return console.log(
      "\n\x1b[7m\x1b[32;1m PASS \x1b[0m \x1b[2mutils/\x1b[0m\x1b[1mseedDB.js",
    );
  } catch (err) {
    return console.log(
      `\n\x1b[7m\x1b[31;1m FAIL \x1b[0m \x1b[2mutils/\x1b[0m\x1b[31;1mseedDB.js\x1b[0m\x1b[31m\n${err.toString()}\x1b[0m`,
    );
  } finally {
    if (SEED) {
      process.exit(0);
    }
  }
};

if (SEED) seedDB();

export default seedDB;
/* eslint-enable no-console */
