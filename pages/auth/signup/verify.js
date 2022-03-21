import React, { useRef, useState } from 'react'
import { verify, verifyOtpforRegistration } from '../../../store/actions/auth'
import { useRouter } from 'next/router'
import { Fragment } from 'react'

import Popup from '../../../components/common/popup'
import EmojiHappyIcon from '../../../components/icons/outline/emojiHappyIcon'
import ExclamationIcon from '../../../components/icons/outline/emojiHappyIcon'
import { AuthType } from '../../../enum'

function OtpInput({ name, refs, onChange }) {
  return (
    <div className="h-14 w-14 overflow-hidden bg-white ">
      <input
        type="number"
        name={name}
        className="h-full w-full rounded-lg border bg-transparent p-2 text-center text-lg font-semibold text-primary focus:bg-secondary focus:bg-opacity-40 focus:outline-none"
        ref={refs}
        onChange={onChange}
      />
    </div>
  )
}

function VerifyOtp() {
  const router = useRouter()
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const one = useRef(null)
  const two = useRef(null)
  const three = useRef(null)
  const four = useRef(null)

  const onChangeEvent = (e, ref, blur = false) => {
    if (e.target.value.length == 1 && !blur) {
      ref.current.focus()
    }
    if (e.target.value.length == 1 && blur) {
      ref.current.blur()
    }
    console.log(e.target.value)
  }

  const onSubmit = async () => {
    if (
      one.current.value &&
      two.current.value &&
      three.current.value &&
      four.current.value
    ) {
      try {
        let value = `${one.current.value}${two.current.value}${three.current.value}${four.current.value}`
        const response = await verify(
          value,
          router.query.number,
          router.query.type ?? AuthType.Customer
        )
        setSuccess(response ?? 'Yayyy,Your Number is Verified.')
      } catch (err) {
        setError(err?.response?.data?.message ?? 'Something went Wrong')
      }
    } else if (!one.current.value) {
      one.current.focus()
    } else if (!two.current.value) {
      two.current.focus()
    } else if (!three.current.value) {
      three.current.focus()
    } else {
      four.current.focus()
    }
  }

  return (
    <Fragment>
      {error && (
        <Popup
          onPressAnyOption={() => setError(null)}
          message={error}
          title="Wrong Input"
          okMessage="Ok"
          cancelMessage="Cancel"
          Icon={ExclamationIcon}
          show={false}
        />
      )}
      {success && (
        <Popup
          onPressAnyOption={() => {
            router.replace('/auth/login')
          }}
          message={success}
          title="Go to Login Page"
          okMessage="Ok"
          show={false}
          cancelMessage="Cancel"
          Icon={EmojiHappyIcon}
        />
      )}
      <div className="relative mt-8 h-screen bg-background md:flex">
        <div className="md:bg-driving h-height w-full px-2 pt-3 md:flex md:flex-col md:items-center md:justify-center md:bg-cover ">
          <div className="mb-16 flex flex-col items-center md:mb-8 md:font-bold">
            <h1 className="mb-1 text-2xl ">Enter OTP</h1>
            <h1 className=" text-center text-sm capitalize  md:text-lg">
              Enter the Verification Code sent to your
              <br />
              mobile number {router.query.number}
            </h1>
          </div>
          <div className="rounded-md md:mx-5 md:w-1/2 md:bg-white md:px-8 md:py-8 md:shadow-lg xl:w-1/3">
            <div className="mb-16 flex justify-center space-x-3 md:justify-between  md:space-x-0">
              <OtpInput
                name="1"
                refs={one}
                onChange={(e) => {
                  onChangeEvent(e, two)
                }}
              />
              <OtpInput
                name="2"
                refs={two}
                onChange={(e) => {
                  onChangeEvent(e, three)
                }}
              />
              <OtpInput
                name="3"
                refs={three}
                onChange={(e) => {
                  onChangeEvent(e, four)
                }}
              />
              <OtpInput
                name="4"
                refs={four}
                onChange={(e) => {
                  onChangeEvent(e, four, true)
                }}
              />
            </div>
            <div className="mb-4 flex justify-between space-x-5 px-8">
              <button className="h-10 w-6/12 rounded-md border-2 border-primary focus:outline-none">
                Back
              </button>
              <button
                className="text-heading h-10 w-6/12 rounded-md bg-gradient focus:outline-none"
                onClick={onSubmit}
              >
                Continue
              </button>
            </div>
            <div className="mt-0 px-8 text-center text-sm">
              <span>Didn't receive the OTP? </span>
              <span className="text-primary">Resend</span>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default VerifyOtp
