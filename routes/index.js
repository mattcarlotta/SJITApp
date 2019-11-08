import authRoutes from "./auth";
import dashboardRoutes from "./dashboard";
import eventRoutes from "./event";
import formRoutes from "./form";
import mailRoutes from "./mail";
import memberRoutes from "./member";
import seasonRoutes from "./season";
import teamRoutes from "./team";
import templateRoutes from "./template";
import tokenRoutes from "./token";

export default app => {
  authRoutes(app);
  dashboardRoutes(app);
  eventRoutes(app);
  formRoutes(app);
  mailRoutes(app);
  memberRoutes(app);
  seasonRoutes(app);
  teamRoutes(app);
  templateRoutes(app);
  tokenRoutes(app);
};
