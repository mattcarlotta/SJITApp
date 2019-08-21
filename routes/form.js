import {
  createForm,
  deleteForm,
  getAllForms,
  getForm,
  updateForm,
  updateFormAp,
  viewApForm,
} from "controllers/form";
import { requireAuth, requireStaffRole } from "services/strategies";

export default app => {
  app.post("/api/form/create", requireStaffRole, createForm);
  app.delete("/api/form/delete/:id", requireStaffRole, deleteForm);
  app.get("/api/forms/all", requireStaffRole, getAllForms);
  app.get("/api/form/edit/:id", requireStaffRole, getForm);
  app.put("/api/form/update", requireStaffRole, updateForm);
  app.put("/api/form/update/ap", requireAuth, updateFormAp);
  app.get("/api/form/view/:id", requireAuth, viewApForm);
};
