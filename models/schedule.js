import { Schema, model } from "mongoose";

// monthly schedule
const scheduleSchema = new Schema({
  beginMonth: Date,
  endMonth: Date,
  events: [{ type: Schema.Types.ObjectId, ref: "Event" }],
  openEnrollDate: Date,
  closeEnrollDate: Date,
  season: { type: Schema.Types.ObjectId, ref: "Season" },
});

export default model("Schedule", scheduleSchema);
