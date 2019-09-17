import {
  deleteMember,
  getAllMembers,
  getMember,
  getMemberEventCount,
  getMemberEventCounts,
  getMemberEventResponseCounts,
  getMemberEvents,
  updateMember,
  updateMemberStatus,
} from "controllers/member";
import { requireStaffRole } from "services/strategies";

export default app => {
  app.delete("/api/member/delete/:id", requireStaffRole, deleteMember);
  app.get("/api/members/all", requireStaffRole, getAllMembers);
  app.get("/api/member/review/:id", requireStaffRole, getMember);
  app.get("/api/member/eventcount", requireStaffRole, getMemberEventCount);
  app.get("/api/members/eventcounts", requireStaffRole, getMemberEventCounts);
  app.get(
    "/api/members/eventresponses",
    requireStaffRole,
    getMemberEventResponseCounts,
  );
  app.get("/api/member/events", requireStaffRole, getMemberEvents);
  app.put("/api/member/update", requireStaffRole, updateMember);
  app.put("/api/member/updatestatus", requireStaffRole, updateMemberStatus);
};
