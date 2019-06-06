import {
  createEvent,
  deleteEvent,
  getAllEvents,
  getEvent,
  updateEvent,
} from "controllers/event";

export default app => {
  app.post("/api/event/create", createEvent);
  app.delete("/api/event/delete/:id", deleteEvent);
  app.get("/api/event/all", getAllEvents);
  app.get("/api/event/:id", getEvent);
  app.put("/api/event/update/:id", updateEvent);
};
