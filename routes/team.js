import {
  createTeam,
  deleteTeam,
  getTeam,
  getAllTeams,
  updateTeam,
} from "controllers/team";

export default app => {
  app.post("/api/team/create", createTeam);
  app.delete("/api/team/delete/:id", deleteTeam);
  app.get("/api/team/all", getAllTeams);
  app.get("/api/team/:id", getTeam);
  app.put("/api/team/update/:id", updateTeam);
};
