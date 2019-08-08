import {
  createEvent,
  deleteEvent,
  getAllEvents,
  getEvent,
  updateEvent,
} from "controllers/event";
import { requireStaffRole } from "services/strategies";

export default app => {
  app.post("/api/event/create", requireStaffRole, createEvent);
  app.delete("/api/event/delete/:id", requireStaffRole, deleteEvent);
  app.get("/api/events/all", requireStaffRole, getAllEvents);
  app.get("/api/event/edit/:id", requireStaffRole, getEvent);
  app.put("/api/event/update/:id", requireStaffRole, updateEvent);
};
