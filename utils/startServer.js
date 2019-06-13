import express from "express";
import middlewares from "middlewares";
import routes from "routes";
import server from "server";
// import seedAdmin from "seeds/admin";

const app = express();

middlewares(app);
routes(app);
// seedAdmin();
server(app);
