import {
  createSeason,
  deleteSeason,
  getAllSeasons,
  getSeason,
  updateSeason,
} from "controllers/season";

export default app => {
  app.post("/api/season/create", createSeason);
  app.delete("/api/season/delete/:id", deleteSeason);
  app.get("/api/season/all", getAllSeasons);
  app.get("/api/season/:id", getSeason);
  app.put("/api/season/update/:id", updateSeason);
};
