import {
  contactUs,
  createMail,
  deleteMail,
  getAllMail,
  getMail,
  resendMail,
  updateMail,
} from "controllers/mail";
import { requireAuth, requireStaffRole } from "services/strategies";

export default app => {
  app.post("/api/mail/contact", requireAuth, contactUs);
  app.post("/api/mail/create", requireStaffRole, createMail);
  app.delete("/api/mail/delete/:id", requireStaffRole, deleteMail);
  app.get("/api/mail/all", requireStaffRole, getAllMail);
  app.get("/api/mail/edit/:id", requireStaffRole, getMail);
  app.put("/api/mail/resend/:id", requireStaffRole, resendMail);
  app.put("/api/mail/update", requireStaffRole, updateMail);
};
