import { ValidationError } from "yup";
import mongoose from "mongoose";

export default function checkError(err, res) {
  console.log("error", err);
  if (err instanceof mongoose.Error) {
    return res.status(400).send({
      errorType: "Bad credentials",
      message: err.message,
    });
  }
  if (err.name == "MongoError") {
    if (err.code == 11000) {
      return res.status(400).send({
        errorType: "Duplicate credientials",
        message: "Number Already Registered",
      });
    }
    return res.status(400).send({
      errorType: "Duplicate credientials",
      message: err.message,
    });
  }
  if (err.code == 21614) {
    return res.status(400).send({
      errorType: "Wrong Number",
      message: "Not Seem to be Invalid",
    });
  }
  if (err instanceof ValidationError) {
    return res.status(400).send({
      errorType: "Invalid Field",
      message: "Fields are Invalid",
    });
  }
  if (err.code == 21608) {
    return res.status(400).send({
      errorType: "Not verified",
      message: "Not verified Number ",
    });
  }
  if (err.name == "ClientError") {
    return res.status(err.status).send({
      errorType: err.errorType,
      message: err.message,
    });
  }
  return res.status(500).send({
    errorType: "Bad request",
    message: "internal server error",
  });
}
