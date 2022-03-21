import CustomError from '../../../lib/customError'
import dbConnect from '../../../lib/db'

import Artist from '../../../lib/model'
import checkError from '../../../lib/checkError'
import axios from 'axios'
import { AuthType } from '../../../enum'

async function signup(req, res) {
  await dbConnect()
  if (req.method === 'POST') {
    console.log('hello', req.body)
    try {
      if (!req.body.number || !req.body.password || !req.body.username) {
        throw new CustomError(
          'Bad request',
          404,
          'Please provide valid credientials'
        )
      }
      const code = parseInt(Math.random() * 8999 + 1000)
      const phone = req.body.number
      const artist = await Artist.findOne({ _id: req.body.number }, { _id: 1 })
      if (artist) {
        throw new CustomError('Bad request', 404, 'Number Already Exists')
      }
      let key = process.env.MSG_KEY

      let msg = `Your%20OTP%20is%20:%20${code}%nVenido%20cab%20services`

      const response = await axios({
        headers: { 'content-type': 'application/json' },
        url: `https://api.textlocal.in/send/?apiKey=${key}&sender=VENIDO&numbers=91${phone}&message=${msg}`,
      })
      console.log('response', response.data.errors)
      await new Artist({
        ...req.body,
        code,
        codeValid: true,
        method: AuthType.Number,
      }).save()
      res.status(201).send({
        message: 'we send you a otp please enter here to verify your number',
      })
    } catch (err) {
      console.log(err)
      checkError(err, res)
    }
  } else {
    res.status(405).json({ message: 'We only support POST' })
  }
}

export default signup
