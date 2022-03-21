import axios from "axios";
import checkError from "../../../lib/checkError";
import CustomError from "../../../lib/customError";
import dbConnect from "../../../lib/db";
import Customer from "../../../lib/model";

async function verifyForgot(req, res) {
  await dbConnect();
  if (req.method === "POST") {
    try {
      console.log(req.body);
      const owner = await Customer.findOne({
        _id: req.body.number,
        forgotOtp: req.body.code,
      });
      console.log("owner", owner);

      if (!owner) {
        throw new CustomError(
          "Bad credentials",
          400,
          "please provide valid otp"
        );
      }
      owner.forgotOtp = undefined;
      owner.password = req.body.password;
      await owner.save();
      res.status(200).send({ message: "Your password has been changed" });
    } catch (err) {
      checkError(err, res);
    }
  } else {
    res.status(405).json({ message: "We only support POST" });
  }
}

export default verifyForgot;
