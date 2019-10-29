import {
  getAPForm,
  getAvailability,
  getAvailabilityForAllMembers,
  getEventDistribution,
  getEvents,
} from "controllers/dashboard";
import { requireAuth, requireStaffRole } from "services/strategies";

export default app => {
  app.get("/api/dashboard/ap-form", requireAuth, getAPForm);
  app.get("/api/dashboard/availability", requireAuth, getAvailability);
  app.get(
    "/api/dashboard/memberavailability",
    requireStaffRole,
    getAvailabilityForAllMembers,
  );
  app.get(
    "/api/dashboard/event-distribution",
    requireAuth,
    getEventDistribution,
  );
  app.get("/api/dashboard/events/:selectedEvent", requireAuth, getEvents);
};
