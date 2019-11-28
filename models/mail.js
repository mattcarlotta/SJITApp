import mongoosePaginate from "mongoose-paginate-v2";
import { Schema, model } from "mongoose";
import moment from "moment-timezone";

// email
const mailSchema = new Schema({
  message: { type: String, required: true },
  sendTo: [{ type: String, required: true }],
  sendFrom: { type: String, required: true },
  sendDate: {
    type: Date,
    default: moment.tz("America/Los_Angeles").format(),
  },
  status: { type: String, default: "unsent" },
  subject: { type: String, required: true },
});

mailSchema.plugin(mongoosePaginate);

export default model("Mail", mailSchema);
