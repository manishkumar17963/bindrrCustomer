import checkError from "../../../lib/checkError";
import CustomError from "../../../lib/customError";
import dbConnect from "../../../lib/db";
import auth from "../../../lib/auth";

async function currentUser(req, res) {
  await dbConnect();
  if (req.method === "GET") {
    try {
      console.log(req.cookie);

      const user = await auth(req.headers?.cookie.split("=")[1]);

      if (!user) {
        throw new CustomError("Bad request", 404, "Not authorized");
      }
      console.log(user);
      res.status(200).send({
        user,
      });
    } catch (err) {
      checkError(err, res);
    }
  } else {
    res.status(405).json({ message: "We only support POST" });
  }
}

export default verify;
