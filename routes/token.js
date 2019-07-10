import { createToken, deleteToken, getAllTokens } from "controllers/token";
import { requireStaffRole } from "services/strategies";

export default app => {
  app.post("/api/token/create", requireStaffRole, createToken);
  app.delete("/api/token/delete/:id", requireStaffRole, deleteToken);
  app.get("/api/tokens/all", requireStaffRole, getAllTokens);
};
