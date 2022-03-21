import cookie from 'cookie'
import checkError from '../../../lib/checkError'
import dbConnect from '../../../lib/db'
import Artist from '../../../lib/model'
import CustomError from '../../../lib/customError'
import jwt from 'jsonwebtoken'

async function login(req, res) {
  await dbConnect()
  if (req.method === 'POST') {
    try {
      console.log(req.body)
      const { number, password, webToken } = req.body
      if (!number || !password) {
        throw new CustomError(
          'Bad request',
          404,
          'please give correct credientials for verification'
        )
      }
      const artist = await Artist.findByCredentials(
        req.body.number,
        req.body.password
      )

      const token = await artist.generateAuthToken(webToken)
      res.setHeader(
        'Set-Cookie',
        cookie.serialize(
          'next-auth.session-token',
          jwt.sign(
            { username: artist.username, token },
            process.env.JWT_SECRET
          ),
          {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'strict',
            maxAge: 2 * 60 * 60 * 24 * 365,
            path: '/',
          }
        )
      )
      res.status(200).send({
        token,
        username: artist.username,
      })
    } catch (err) {
      console.log(err)
      checkError(err, res)
    }
  } else {
    res.status(405).json({ message: 'We only support POST' })
  }
}

export default login
