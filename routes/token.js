import {
  createToken,
  deleteManyTokens,
  deleteToken,
  getAllTokens,
  getToken,
  resendToken,
  updateToken,
} from "controllers/token";
import { requireStaffRole } from "services/strategies";

export default app => {
  app.post("/api/token/create", requireStaffRole, createToken);
  app.delete("/api/tokens/delete-many", requireStaffRole, deleteManyTokens);
  app.delete("/api/token/delete/:id", requireStaffRole, deleteToken);
  app.get("/api/tokens/all", requireStaffRole, getAllTokens);
  app.get("/api/token/edit/:id", requireStaffRole, getToken);
  app.put("/api/token/resend/:id", requireStaffRole, resendToken);
  app.put("/api/token/update", requireStaffRole, updateToken);
};
