import {
  deleteMember,
  getAllMembers,
  getAllMemberNames,
  getMember,
  getMemberAvailability,
  getMemberEventCounts,
  getMemberEvents,
  updateMember,
  updateMemberStatus,
} from "controllers/member";
import { requireAuth, requireStaffRole } from "services/strategies";

export default app => {
  app.delete("/api/member/delete/:id", requireStaffRole, deleteMember);
  app.get("/api/members/all", requireStaffRole, getAllMembers);
  app.get("/api/members/names", requireStaffRole, getAllMemberNames);
  app.get("/api/member/review/:id", requireStaffRole, getMember);
  app.get("/api/member/availability", requireAuth, getMemberAvailability);
  app.get("/api/members/eventcounts", requireStaffRole, getMemberEventCounts);
  app.get("/api/member/events", requireStaffRole, getMemberEvents);
  app.put("/api/member/update", requireStaffRole, updateMember);
  app.put("/api/member/updatestatus", requireStaffRole, updateMemberStatus);
};
