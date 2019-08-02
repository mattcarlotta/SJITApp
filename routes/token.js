import {
  createToken,
  deleteToken,
  getAllTokens,
  getToken,
  updateToken,
} from "controllers/token";
import { requireStaffRole } from "services/strategies";

export default app => {
  app.post("/api/token/create", requireStaffRole, createToken);
  app.delete("/api/token/delete/:id", requireStaffRole, deleteToken);
  app.get("/api/tokens/all", requireStaffRole, getAllTokens);
  app.get("/api/tokens/edit/:id", requireStaffRole, getToken);
  app.put("/api/tokens/update", requireStaffRole, updateToken);
};
