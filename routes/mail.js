import {
  contactUs,
  createMail,
  deleteMail,
  deleteManyMails,
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
  app.delete("/api/mails/delete-many", requireStaffRole, deleteManyMails);
  app.get("/api/mail/all", requireStaffRole, getAllMail);
  app.get("/api/mail/edit/:id", requireStaffRole, getMail);
  app.put("/api/mail/resend/:id", requireStaffRole, resendMail);
  app.put("/api/mail/update", requireStaffRole, updateMail);
};
