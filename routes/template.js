import {
  createTemplate,
  deleteTemplate,
  getTemplate,
  getAllTemplates,
  updateTemplate,
} from "controllers/template";
import { requireStaffRole } from "services/strategies";

export default app => {
  app.post("/api/template/create", requireStaffRole, createTemplate);
  app.delete("/api/template/delete/:id", requireStaffRole, deleteTemplate);
  app.get("/api/templates/all", requireStaffRole, getAllTemplates);
  app.get("/api/template/edit/:id", requireStaffRole, getTemplate);
  app.put("/api/template/update", requireStaffRole, updateTemplate);
};
