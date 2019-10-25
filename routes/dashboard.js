import { fetchEvents } from "controllers/dashboard";
import { requireAuth } from "services/strategies";

export default app => {
  app.get("/api/dashboard/events/:selectedEvent", requireAuth, fetchEvents);
};
