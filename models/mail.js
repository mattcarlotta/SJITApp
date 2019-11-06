import mongoosePaginate from "mongoose-paginate-v2";
import { Schema, model } from "mongoose";
import moment from "moment";

// email
const mailSchema = new Schema({
  message: { type: String, required: true },
  sendTo: [{ type: String, required: true }],
  sendFrom: { type: String, required: true },
  sendDate: {
    type: Date,
    default: moment(Date.now())
      .utcOffset(-7)
      .toISOString(true),
  },
  status: { type: String, default: "unsent" },
  subject: { type: String, required: true },
});

mailSchema.plugin(mongoosePaginate);

export default model("Mail", mailSchema);
