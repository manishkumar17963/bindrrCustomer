import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import CustomError from './customError'
import convertEnumToArray from '../helpers/enumArray'
import { AuthType } from '../enum'

var ArtistSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      min: 10,
      trim: true,
      alias: 'number',
      required: true,
    },
    forgotOtp: { type: Number },
    username: {
      type: String,
      required: true,
    },

    profileImage: String,

    password: {
      type: String,
      min: 8,
      trim: true,
      validate(value) {
        if (value.toLowerCase().includes('password')) {
          throw new Error('password cannot contain password')
        }
      },
      required: function () {
        return this.method == AuthType.Number
      },
    },
    tokens: [
      {
        token: {
          type: String,
        },
      },
    ],

    code: {
      type: Number,
      required: true,
    },
    codeValid: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
    _id: false,
  }
)

ArtistSchema.index(
  { createdAt: 1 },
  { expireAfterSeconds: 300, partialFilterExpression: { codeValid: true } }
)

ArtistSchema.methods.toJSON = function () {
  const user = this
  const userObject = user.toObject()

  delete userObject.password
  delete userObject.tokens

  return userObject
}

ArtistSchema.methods.generateAuthToken = async function (webToken) {
  const user = this
  const token = jwt.sign(
    { _id: user._id.toString(), username: user.username },
    'hellofem'
  )
  console.log('userrrrrr', user)
  user.tokens.push({ token })

  webToken && user.webToken.push({ token, webToken })
  console.log('tokens', user.webToken, user.tokens)
  user.codeValid = false
  await user.save()

  return token
}

ArtistSchema.statics.findByCredentials = async (number, password) => {
  console.log('from credi', number, password)
  const user = await Artist.findOne({ _id: number })

  if (!user) {
    throw new CustomError(
      'Bad credentials',
      404,
      'Please Login with Registerd Number'
    )
  }

  const isMatch = await bcrypt.compare(password, user.password)

  if (!isMatch) {
    throw new CustomError('Bad credentials', 404, 'Your Password Doesnot Match')
  }

  return user
}

// Hash the plain text password before saving
ArtistSchema.pre('save', async function (next) {
  const user = this

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8)
  }

  next()
})
const Artist = mongoose.models.Artist || mongoose.model('Artist', ArtistSchema)
export default Artist
