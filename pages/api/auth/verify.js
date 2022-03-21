import checkError from '../../../lib/checkError'
import CustomError from '../../../lib/customError'
import dbConnect from '../../../lib/db'
import Rider from '../../../lib/model'

async function verify(req, res) {
  await dbConnect()
  if (req.method === 'POST') {
    try {
      const { number, code } = req.body
      if (!number || !code) {
        throw new CustomError(
          'Bad request',
          404,
          'please give correct otp for verification'
        )
      }
      const customer = await Rider.findOneAndUpdate(
        { _id: number },
        { $set: { codeValid: false } }
      )
      console.log('customer', customer, req.body)
      if (!customer) {
        throw new CustomError(
          'Bad credentials',
          400,
          'Please Provide Valid Otp'
        )
      }
      res.status(200).send({
        message: 'Your Number is Verified Now',
      })
    } catch (err) {
      checkError(err, res)
    }
  } else {
    res.status(405).json({ message: 'We only support POST' })
  }
}

export default verify
