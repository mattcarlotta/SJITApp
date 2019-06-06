import {
  createTemplate,
  deleteTemplate,
  getTemplate,
  getAllTemplates,
  updateTemplate,
} from "controllers/template";

export default app => {
  app.post("/api/template/create", createTemplate);
  app.delete("/api/template/delete/:id", deleteTemplate);
  app.get("/api/template/all", getAllTemplates);
  app.get("/api/template/:id", getTemplate);
  app.put("/api/template/update/:id", updateTemplate);
};
