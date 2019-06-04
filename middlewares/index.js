import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import passport from "passport";
import session from "express-session";
import connectMongo from "connect-mongo";
import mongodbConnection from "database";
import config from "env";
// import userModel from "models/user";

const { DATABASE, CLIENT, NODE_ENV } = process.env;
const inTesting = NODE_ENV === "test";

const MongoStore = connectMongo(session);
//= ===========================================================//
/* APP MIDDLEWARE */
//= ===========================================================//
export default app => {
  mongodbConnection();
  // userModel();
  app.use(
    session({
      secret: config[NODE_ENV].cookieKey,
      maxAge: 30 * 24 * 60 * 60 * 1000, // expire after 30 days, 30days/24hr/60m/60s/1000ms
      saveUninitialized: false, // don't create session until something stored
      resave: false, //don't save session if unmodified
      store: new MongoStore({
        url: DATABASE,
        name: "SJIceTeamMember",
        touchAfter: 24 * 3600, // time period in between refreshing a session
        autoRemoveInterval: 10, // interval between checking to remove old sessions
        autoRemove: "native" // allow Mongo to automatically remove old sessions
      })
    })
  );
  app.use(
    cors({
      credentials: true,
      origin: CLIENT
    })
  ); // allows receiving of cookies/tokens from front-end
  if (!inTesting) app.use(morgan("tiny")); // logging framework
  app.use(bodyParser.json()); // parses header requests (req.body)
  app.use(bodyParser.urlencoded({ extended: true })); // allows objects and arrays to be URL-encoded
  app.use(passport.initialize()); // initialize passport routes to accept req/res/next
  app.set("json spaces", 2); // sets JSON spaces for clarity
};
