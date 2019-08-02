/* eslint-disable no-console */
import { connectDatabase } from "database";
import { User, Season, Token } from "models";
import {
  createSignupToken,
  createRandomToken,
  expirationDate,
} from "shared/helpers";
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
      startDate: new Date(2000, 8, 26),
      endDate: new Date(2001, 5, 12),
    };

    const newSeason2 = {
      seasonId: "20052006",
      startDate: new Date(2005, 8, 26),
      endDate: new Date(2006, 5, 12),
    };

    const newSeason3 = {
      seasonId: "20112012",
      startDate: new Date(2011, 8, 26),
      endDate: new Date(2012, 5, 12),
    };

    await Season.create(newSeason);
    await Season.create(newSeason2);
    await Season.create(newSeason3);
    const createdSeason = await Season.findOne({
      seasonId: newSeason.seasonId,
    });

    const newHire = {
      authorizedEmail: "member@example.com",
      email: "member@example.com",
      role: "member",
      seasonId: newSeason.seasonId,
      token: createSignupToken(),
      expiration: expirationDate().toDate(),
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

    const staffMember = {
      email: "staffmember@example.com",
      password: memberPassword,
      firstName: "Staff",
      lastName: "Member",
      role: "staff",
      token: createRandomToken(),
    };

    const member = {
      email: "member@example.com",
      password: memberPassword,
      firstName: "Member",
      lastName: "Member",
      role: "employee",
      token: createRandomToken(),
    };

    const member2 = {
      email: "member2@example.com",
      password: memberPassword,
      firstName: "Member2",
      lastName: "Member2",
      role: "employee",
      token: createRandomToken(),
    };

    const member3 = {
      email: "member3@example.com",
      password: memberPassword,
      firstName: "Member3",
      lastName: "Member3",
      role: "employee",
      token: createRandomToken(),
    };

    const member4 = {
      email: "member4@example.com",
      password: memberPassword,
      firstName: "Member4",
      lastName: "Member4",
      role: "employee",
      token: createRandomToken(),
      status: "suspended",
    };

    const member5 = {
      email: "member5@example.com",
      password: memberPassword,
      firstName: "Member5",
      lastName: "Member5",
      role: "employee",
      token: createRandomToken(),
      status: "suspended",
    };

    const member6 = {
      email: "member6@example.com",
      password: memberPassword,
      firstName: "Member6",
      lastName: "Member6",
      role: "employee",
      token: createRandomToken(),
      status: "active",
    };

    const member7 = {
      email: "member7@example.com",
      password: memberPassword,
      firstName: "Member7",
      lastName: "Member7",
      role: "employee",
      token: createRandomToken(),
      status: "active",
    };

    const member8 = {
      email: "member8@example.com",
      password: memberPassword,
      firstName: "Member8",
      lastName: "Member8",
      role: "employee",
      token: createRandomToken(),
      status: "active",
    };

    await User.create(administrator);
    await User.create(staffMember);
    await User.create(member);
    await User.create(member2);
    await User.create(member3);
    await User.create(member4);
    await User.create(member5);
    await User.create(member6);
    await User.create(member7);
    await User.create(member8);

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
