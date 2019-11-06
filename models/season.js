import mongoosePaginate from "mongoose-paginate-v2";
import { Schema, model } from "mongoose";

// current season year
const seasonSchema = new Schema({
  seasonId: { type: String, unique: true, lowercase: true },
  startDate: Date,
  endDate: Date,
});

seasonSchema.plugin(mongoosePaginate);

export default model("Season", seasonSchema);
