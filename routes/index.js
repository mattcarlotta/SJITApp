import authRoutes from "./auth";
// import eventRoutes from "./event";
import seasonRoutes from "./season";
// import teamRoutes from "./team";
// import templateRoutes from "./template";
import tokenRoutes from "./token";
// import userRoutes from "./user";

export default app => {
  authRoutes(app);
  // eventRoutes(app);
  seasonRoutes(app);
  // teamRoutes(app);
  // templateRoutes(app);
  tokenRoutes(app);
  // userRoutes(app);
};
