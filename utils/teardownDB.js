/* eslint-disable */
import mongoose from "mongoose";
import { options } from "database";
const { DATABASE, WATCHING } = process.env;

const teardownDB = async () => {
  const conn = mongoose.createConnection(DATABASE, options);
  try {
    await conn.dropDatabase();
    await conn.close();
    return console.log(
      "\n\x1b[7m\x1b[32;1m PASS \x1b[0m \x1b[2mutils/\x1b[0m\x1b[1mteardownDB.js",
    );
  } catch (err) {
    return console.log(
      `\n\x1b[7m\x1b[31;1m FAIL \x1b[0m \x1b[2mutils/\x1b[0m\x1b[31;1mteardownDB.js\x1b[0m\x1b[31m\n${err.toString()}\x1b[0m`,
    );
  } finally {
    if (!WATCHING) {
      process.exit(0);
    }
  }
};

export default teardownDB;
/* eslint-enable no-console */
