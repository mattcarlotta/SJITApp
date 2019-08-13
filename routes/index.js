import authRoutes from "./auth";
import eventRoutes from "./event";
import formRoutes from "./form";
import memberRoutes from "./member";
import seasonRoutes from "./season";
import teamRoutes from "./team";
import templateRoutes from "./template";
import tokenRoutes from "./token";

export default app => {
  authRoutes(app);
  eventRoutes(app);
  formRoutes(app);
  memberRoutes(app);
  seasonRoutes(app);
  teamRoutes(app);
  templateRoutes(app);
  tokenRoutes(app);
};
