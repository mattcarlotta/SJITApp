import { Schema, model } from "mongoose";

const eventSchema = new Schema({
  league: { type: String, default: "NHL", required: true },
  eventType: { type: String, default: "Game", required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  location: { type: String, default: "SAP Center at San Jose" },
  employeeResponses: [
    {
      id: { type: Schema.Types.ObjectId, ref: "User" },
      response: { type: String, required: true },
      notes: String,
    },
  ],
  scheduledEmployees: [
    {
      id: { type: Schema.Types.ObjectId, ref: "User" },
    },
  ],
  seasonId: { type: String, required: true },
  team: String,
  callTimes: { type: Array, of: Date, required: true },
  uniform: { type: String, default: "Teal Jersey" },
  notes: String,
});

export default model("Event", eventSchema);
