import {
  getAPForm,
  getEventDistribution,
  getEvents,
} from "controllers/dashboard";
import { requireAuth } from "services/strategies";

export default app => {
  app.get("/api/dashboard/ap-form", requireAuth, getAPForm);
  app.get(
    "/api/dashboard/event-distribution",
    requireAuth,
    getEventDistribution,
  );
  app.get("/api/dashboard/events/:selectedEvent", requireAuth, getEvents);
};
