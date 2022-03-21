import Rider from "./model";
import jwt from "jsonwebtoken";

async function auth(token, select = {}) {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const user = await Rider.findOne({
    _id: decoded._id,
    "tokens.token": token,
  }).select(select);
  return user;
}
export default auth;
