/* eslint-disable no-console */
import { connectDatabase } from "database";
import { Event, User, Season, Team, Token } from "models";
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

const teams = [
  { team: "Anaheim Ducks", league: "NHL", name: "anaheim-ducks" },
  { team: "Arizona Coyotes", league: "NHL", name: "arizona-coyotes" },
  { team: "Bakersfield Condors", league: "AHL", name: "bakersfield-condors" },
  { team: "Belleville Senators", league: "AHL", name: "belleville-senators" },
  { team: "Binghampton Devils", league: "AHL", name: "binghampton-devils" },
  { team: "Boston Bruins", league: "NHL", name: "boston-bruins" },
  {
    team: "Bridgeport Sound Tigers",
    league: "AHL",
    name: "bridgeport-sound-tigers",
  },
  { team: "Buffalo Sabres", league: "NHL", name: "buffalo-sabres" },
  { team: "Calgary Flames", league: "NHL", name: "calgary-flames" },
  { team: "Carolina Hurricanes", league: "NHL", name: "carolina-hurricanes" },
  { team: "Charlotte Checkers", league: "AHL", name: "charlotte-checkers" },
  { team: "Chicago Blackhawks", league: "NHL", name: "chicago-blackhawks" },
  { team: "Chicago Wolves", league: "AHL", name: "chicago-wolves" },
  { team: "Cleveland Monsters", league: "AHL", name: "cleveland-monsters" },
  { team: "Colorado Avalanche", league: "NHL", name: "colorado-avalanche" },
  { team: "Colorado Eagles", league: "AHL", name: "colorado-eagles" },
  {
    team: "Columbus Blue Jackets",
    league: "NHL",
    name: "columbus-blue-jackets",
  },
  { team: "Dallas Stars", league: "NHL", name: "dallas-stars" },
  { team: "Detriot Red Wings", league: "NHL", name: "detriot-red-wings" },
  { team: "Edmonton Oilers", league: "NHL", name: "edmonton-oilers" },
  { team: "Florida Panthers", league: "NHL", name: "florida-panthers" },
  {
    team: "Grand Rapids Griffins",
    league: "AHL",
    name: "grand-rapids-griffins",
  },
  { team: "Hartford Wolf Pack", league: "AHL", name: "hartford-wolf-pack" },
  { team: "Hershey Bears", league: "AHL", name: "hershey-bears" },
  { team: "Iowa Wild", league: "AHL", name: "iowa-wild" },
  { team: "Laval Rocket", league: "AHL", name: "laval-rocket" },
  {
    team: "Lehigh Valley Phantoms",
    league: "AHL",
    name: "lehigh-valley-phantoms",
  },
  { team: "Los Angeles Kings", league: "NHL", name: "los-angeles-kings" },
  { team: "Manitoba Moose", league: "AHL", name: "manitoba-moose" },
  { team: "Milwaukee Admirals", league: "AHL", name: "milwaukee-admirals" },
  { team: "Minnesota Wild", league: "NHL", name: "minnesota-wild" },
  { team: "Montreal Canadiens", league: "NHL", name: "montreal-canadiens" },
  { team: "Nashville Predators", league: "NHL", name: "nashville-predators" },
  { team: "New Jersey Devils", league: "NHL", name: "new-jersey-devils" },
  { team: "New York Islanders", league: "NHL", name: "new-york-islanders" },
  { team: "New York Rangers", league: "NHL", name: "new-york-tangers" },
  { team: "Ontario Reign", league: "NHL", name: "ontario-reign" },
  { team: "Ottawa Senators", league: "NHL", name: "ottawa-senators" },
  { team: "Philadelphia Flyers", league: "NHL", name: "philadelphia-flyers" },
  { team: "Pittsburgh Penguins", league: "NHL", name: "pittsburgh-penguins" },
  { team: "Providence Bruins", league: "AHL", name: "providence-bruins" },
  { team: "Rochester Americans", league: "AHL", name: "rochester-americans" },
  { team: "Rockford Ice Hogs", league: "AHL", name: "rockford-ice-hogs" },
  { team: "San Antonio Rampage", league: "AHL", name: "san-antonio-rampage" },
  { team: "San Diego Gulls", league: "AHL", name: "san-diego-gulls" },
  { team: "San Jose Barracuda", league: "AHL", name: "san-jose-barracuda" },
  { team: "San Jose Sharks", league: "NHL", name: "san-jose-sharks" },
  {
    team: "Springfield Thunderbirds",
    league: "AHL",
    name: "springfield-thunderbirds",
  },
  { team: "St. Louis Blues", league: "NHL", name: "st-louis-blues" },
  { team: "Stockton Heat", league: "AHL", name: "stockton-heat" },
  { team: "Syracuse Crunch", league: "AHL", name: "syracuse-crunch" },
  { team: "Tampa Bay Lightning", league: "NHL", name: "tampa-bay-lightning" },
  { team: "Texas Stars", league: "AHL", name: "texas-stars" },
  { team: "Toronto Maple Leafs", league: "NHL", name: "toronto-maple-leafs" },
  { team: "Toronto Marlies", league: "AHL", name: "toronto-marlies" },
  { team: "Tucson Roadrunners", league: "AHL", name: "tucson-roadrunners" },
  { team: "Utica Comets", league: "AHL", name: "utica-comets" },
  { team: "Vancouver Canucks", league: "NHL", name: "vancouver-canucks" },
  { team: "Vegas Golden Knights", league: "NHL", name: "vegas-golden-knights" },
  { team: "Washington Capitals", league: "NHL", name: "washington-capitals" },
  {
    team: "Wilkes Barre Scranton Penguins",
    league: "AHL",
    name: "wilkes-barre-scranton-penguins",
  },
  { team: "Winnipeg Jets", league: "NHL", name: "winnipeg-jets" },
];

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

    const newEvent = {
      team: "San Jose Sharks",
      opponent: "Los Angeles Kings",
      eventType: "Game",
      location: "Test Location",
      callTimes: [
        "2019-08-09T17:45:26-07:00",
        "2019-08-09T18:15:26-07:00",
        "2019-08-09T18:30:26-07:00",
        "2019-08-09T19:00:26-07:00",
      ],
      uniform: "Teal Jersey",
      seasonId: "20192020",
      eventDate: "2019-08-10T02:30:31.834Z",
    };

    const newEvent2 = {
      team: "San Jose Barracuda",
      opponent: "San Diego Gulls",
      eventType: "Game",
      location: "SAP Center at San Jose",
      callTimes: ["2019-08-09T19:00:38-07:00"],
      uniform: "Barracuda Jacket",
      seasonId: "20192020",
      eventDate: "2019-08-11T02:30:30.036Z",
    };

    await Event.create(newEvent);
    await Event.create(newEvent2);

    await Team.insertMany(teams);

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
