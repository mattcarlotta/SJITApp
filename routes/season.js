import {
  createSeason,
  deleteSeason,
  getAllSeasons,
  getSeason,
  updateSeason,
} from "controllers/season";
import { requireAuth } from "services/strategies";

export default app => {
  app.post("/api/season/create", createSeason);
  app.delete("/api/season/delete/:id", requireAuth, deleteSeason);
  app.get("/api/season/all", requireAuth, getAllSeasons);
  app.get("/api/season/:id", requireAuth, getSeason);
  app.put("/api/season/update/:id", requireAuth, updateSeason);
};
