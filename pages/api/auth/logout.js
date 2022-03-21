import cookie from "cookie";
import checkError from "../../../lib/checkError";
import dbConnect from "../../../lib/db";
import Rider from "../../../lib/model";
import CustomError from "../../../lib/customError";
import jwt from "jsonwebtoken";

async function logout(req, res) {
  await dbConnect();
  if (req.method === "POST") {
    try {
      const token = req.headers["authorization"]?.replace("Bearer ", "");
      console.log("token", token);
      if (!token) {
        throw new CustomError("Bad request", 401, "Please Authenticate first");
      }
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await Rider.findOneAndUpdate(
        {
          _id: decoded._id,
          "tokens.token": token,
        },
        {
          $pull: {
            webToken: { token },
            tokens: { token },
          },
        }
      );

      if (!user) {
        throw new CustomError("Bad request", 401, "Please Authenticate first");
      }

      res.setHeader("Set-Cookie", [
        cookie.serialize("next-auth.session-token", "", {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          sameSite: "strict",
          maxAge: -1,
          path: "/",
        }),
        cookie.serialize("auth", "", {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          sameSite: "strict",
          maxAge: -1,
          path: "/",
        }),
      ]);

      res.status(200).send({
        message: "You are successfully logout",
      });
    } catch (err) {
      console.log(err);
      checkError(err, res);
    }
  } else {
    res.status(405).json({ message: "We only support POST" });
  }
}

export default logout;
