import {
  createTeam,
  deleteTeam,
  getTeam,
  getAllTeamNames,
  getAllTeams,
  updateTeam,
} from "controllers/team";
import { requireStaffRole } from "services/strategies";

export default app => {
  app.post("/api/team/create", requireStaffRole, createTeam);
  app.delete("/api/team/delete/:id", requireStaffRole, deleteTeam);
  app.get("/api/teams/all/names", requireStaffRole, getAllTeamNames);
  app.get("/api/teams/all", requireStaffRole, getAllTeams);
  app.get("/api/team/edit/:id", requireStaffRole, getTeam);
  app.put("/api/team/update", requireStaffRole, updateTeam);
};
