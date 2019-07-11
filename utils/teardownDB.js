/* eslint-disable */
import { connectDatabase } from "database";
const { WATCHING } = process.env;

const teardownDB = async () => {
  const db = connectDatabase();
  try {
    await db.dropDatabase();
    await db.close();
    return console.log(
      "\n\x1b[7m\x1b[32;1m PASS \x1b[0m \x1b[2mutils/\x1b[0m\x1b[1mteardownDB.js",
    );
  } catch (err) {
    return console.log(
      `\n\x1b[7m\x1b[31;1m FAIL \x1b[0m \x1b[2mutils/\x1b[0m\x1b[31;1mteardownDB.js\x1b[0m\x1b[31m\n${err.toString()}\x1b[0m`,
    );
  } finally {
    if (!WATCHING) {
      await db.close();
      process.exit(0);
    }
  }
};

export default teardownDB;
/* eslint-enable no-console */
