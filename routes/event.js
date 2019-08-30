import {
  createEvent,
  deleteEvent,
  getAllEvents,
  getEvent,
  getEventForScheduling,
  updateEvent,
} from "controllers/event";
import { requireStaffRole } from "services/strategies";

export default app => {
  app.post("/api/event/create", requireStaffRole, createEvent);
  app.delete("/api/event/delete/:id", requireStaffRole, deleteEvent);
  app.get("/api/events/all", requireStaffRole, getAllEvents);
  app.get("/api/event/edit/:id", requireStaffRole, getEvent);
  app.get("/api/event/review/:id", requireStaffRole, getEventForScheduling);
  app.put("/api/event/update", requireStaffRole, updateEvent);
};
