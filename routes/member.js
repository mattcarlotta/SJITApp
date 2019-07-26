import {
  createMember,
  deleteMember,
  getAllMembers,
  getMember,
  updateMember,
  updateMemberStatus,
} from "controllers/member";
import { requireStaffRole } from "services/strategies";

export default app => {
  app.post("/api/member/create", requireStaffRole, createMember);
  app.delete("/api/member/delete/:id", requireStaffRole, deleteMember);
  app.get("/api/members/all", requireStaffRole, getAllMembers);
  app.get("/api/member/review/:id", requireStaffRole, getMember);
  app.put("/api/member/update", requireStaffRole, updateMember);
  app.put("/api/member/updatestatus", requireStaffRole, updateMemberStatus);
};
