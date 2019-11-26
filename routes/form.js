import {
  createForm,
  deleteForm,
  deleteManyForms,
  getAllForms,
  getForm,
  resendFormEmail,
  viewApForm,
  updateForm,
  updateApForm,
} from "controllers/form";
import { requireAuth, requireStaffRole } from "services/strategies";

export default app => {
  app.post("/api/form/create", requireStaffRole, createForm);
  app.delete("/api/form/delete/:id", requireStaffRole, deleteForm);
  app.delete("/api/forms/delete-many", requireStaffRole, deleteManyForms);
  app.get("/api/forms/all", requireStaffRole, getAllForms);
  app.get("/api/form/edit/:id", requireStaffRole, getForm);
  app.put("/api/form/resend-email/:id", requireStaffRole, resendFormEmail);
  app.put("/api/form/update/ap", requireAuth, updateApForm);
  app.put("/api/form/update", requireStaffRole, updateForm);
  app.get("/api/form/view/:id", requireAuth, viewApForm);
};
