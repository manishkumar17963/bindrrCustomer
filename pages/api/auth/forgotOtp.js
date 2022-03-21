import axios from "axios";
import checkError from "../../../lib/checkError";
import CustomError from "../../../lib/customError";
import dbConnect from "../../../lib/db";
import Customer from "../../../lib/model";

async function forgotOtp(req, res) {
  await dbConnect();
  if (req.method === "POST") {
    try {
      console.log("req", req.body);
      const code = Math.round(Math.random() * 8999 + 1000);
      const phone = req.body.number;
      const owner = await Customer.findOneAndUpdate(
        { _id: phone },
        { $set: { forgotOtp: code } },
        {}
      );
      console.log(owner);
      if (!owner) {
        throw new CustomError("Bad Request", 404, "No such user found");
      }
      let key = "NDgzNTM1NTk2NzRiNmQ0ZjY4MzQ0MjZmNzMzNDMyNzY=";

      let msg = `Your%20OTP%20is%20:%20${code}%nVenido%20cab%20services`;

      const response = await axios({
        headers: { "content-type": "application/json" },
        url: `https://api.textlocal.in/send/?apiKey=${key}&sender=VENIDO&numbers=91${phone}&message=${msg}`,
      });

      res.status(201).send({
        message: "we send you a otp please enter here to verify your number",
      });
    } catch (err) {
      checkError(err, res);
    }
  } else {
    res.status(405).json({ message: "We only support POST" });
  }
}

export default forgotOtp;
