import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import passport from "passport";
import session from "express-session";
import connectRedis from "connect-redis";
import redis from "redis";
import config from "env";
import moment from "moment-timezone";
import compression from "compression";
import "database";

moment.tz.setDefault("America/Los_Angeles");

const { CLIENT, NODE_ENV } = process.env;
const inProduction = NODE_ENV === "production";

const RedisStore = connectRedis(session);
const client = redis.createClient({
  db: 0,
  host: "127.0.0.1",
  port: 6379,
});

const shouldCompress = (req, res) => {
  if (req.headers["x-no-compression"]) return false;
  return compression.filter(req, res);
};

const logging = inProduction
  ? ":remote-addr [:date] :referrer :method :url HTTP/:http-version :status :res[content-length]"
  : "tiny";

//= ===========================================================//
/* APP MIDDLEWARE */
//= ===========================================================//
export default app => {
  morgan.token("date", () => moment().format("MMMM Do YYYY, h:mm:ss a"));
  if (inProduction) {
    morgan.token(
      "remote-addr",
      req => req.headers["x-real-ip"]
        || req.headers["x-forwarded-for"]
        || req.connection.remoteAddress,
    );
  } // logs real ip address
  app.use(morgan(logging)); // logging framework
  if (inProduction) app.set("trust proxy", 1);
  app.use(
    session({
      secret: config[NODE_ENV].cookieKey,
      name: "SJSITApp",
      saveUninitialized: false, // don't create session until something stored
      resave: false, // don't save session if unmodified
      sameSite: inProduction, // specifies same-site cookie attribute enforcement
      cookie: {
        path: "/",
        httpOnly: true,
        secure: inProduction,
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 * 24 * 60 * 60 * 1000 expire after 30 days, 30days/24hr/60m/60s/1000ms
      },
      store: new RedisStore({
        client,
      }),
    }),
  );
  app.use(
    cors({
      credentials: true,
      origin: CLIENT,
    }),
  ); // allows receiving of cookies/tokens from front-end
  app.use(
    compression({
      level: 6, // set compression level from 1 to 9 (6 by default)
      filter: shouldCompress, // set predicate to determine whether to compress
    }),
  );
  app.use(bodyParser.json()); // parses header requests (req.body)
  app.use(bodyParser.urlencoded({ extended: true })); // allows objects and arrays to be URL-encoded
  app.use(passport.initialize()); // initialize passport routes to accept req/res/next
  app.set("json spaces", 2); // sets JSON spaces for clarity
};
