import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import passport from "passport";
import session from "express-session";
import connectRedis from "connect-redis";
import mailer from "@sendgrid/mail";
import config from "env";
import "database";
// import "services/strategies";

const { CLIENT, NODE_ENV, protocol } = process.env;
const inTesting = NODE_ENV === "test";

const RedisStore = connectRedis(session);

mailer.setApiKey(config[NODE_ENV].sendgridAPIKey);
//= ===========================================================//
/* APP MIDDLEWARE */
//= ===========================================================//
export default app => {
  app.use(
    session({
      secret: config[NODE_ENV].cookieKey,
      name: "SJITApp",
      saveUninitialized: false, // don't create session until something stored
      resave: false, // don't save session if unmodified
      cookie: {
        path: "/",
        httpOnly: true,
        secure: protocol === "https",
        maxAge: 30 * 24 * 60 * 60 * 1000, // expire after 30 days, 30days/24hr/60m/60s/1000ms
      },
      store: new RedisStore({
        db: 0,
        host: "127.0.0.1",
        port: 6379,
        ttl: 30,
      }),
    }),
  );
  app.use(
    cors({
      credentials: true,
      origin: CLIENT,
    }),
  ); // allows receiving of cookies/tokens from front-end
  if (!inTesting) app.use(morgan("tiny")); // logging framework
  app.use(bodyParser.json()); // parses header requests (req.body)
  app.use(bodyParser.urlencoded({ extended: true })); // allows objects and arrays to be URL-encoded
  app.use(passport.initialize()); // initialize passport routes to accept req/res/next
  app.set("json spaces", 2); // sets JSON spaces for clarity
};
