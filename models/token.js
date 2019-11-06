import mongoosePaginate from "mongoose-paginate-v2";
import { Schema, model } from "mongoose";

// token templates
const tokenSchema = new Schema({
  token: { type: String, required: true, unique: true },
  authorizedEmail: { type: String, lowercase: true, unique: true },
  email: { type: String, default: "", lowercase: true },
  role: { type: String, required: true },
  expiration: {
    type: Date,
  },
});

tokenSchema.plugin(mongoosePaginate);

export default model("Token", tokenSchema);
