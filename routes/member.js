import {
  createMember,
  deleteMember,
  getAllMembers,
  getMember,
  updateMember,
} from "controllers/member";
import { requireStaffRole } from "services/strategies";

export default app => {
  app.post("/api/member/create", requireStaffRole, createMember);
  app.delete("/api/member/delete/:id", requireStaffRole, deleteMember);
  app.get("/api/members/all", requireStaffRole, getAllMembers);
  app.get("/api/member/edit/:id", requireStaffRole, getMember);
  app.put("/api/member/update", requireStaffRole, updateMember);
};
