import React, { useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup'
import { Formik } from 'formik'
import { login } from '../../store/actions/auth'
import Link from 'next/link'

import Image from 'next/dist/client/image'

import AuthInput from '../../components/auth/authInput'
import ExclamationIcon from '../../components/icons/outline/exclamationIcon'
import Popup from '../../components/common/popup'

const phoneRegExp = /^[6-9]\d{9}$/

const SigninSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, 'Too Short!')
    .max(12, 'Too Long!')
    .required('Required'),
  number: Yup.string()
    .matches(phoneRegExp, 'Phone number is not valid')
    .required('Required'),
})

export default function Login({}) {
  const dispatch = useDispatch()
  const router = useRouter()
  const webToken = useSelector((store) => store.auth.webToken)
  const [error, setError] = useState(null)

  return (
    <div className="h-screen border-2  bg-background ">
      <div className=" relative h-56">
        <Image
          alt="Mountains"
          src={`/images/loginFrame.jpg`}
          layout="fill"
          objectFit="cover"
          className=" shadow-lg"
        />
      </div>
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

      <Formik
        initialValues={{ number: '', password: '' }}
        validationSchema={SigninSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            await dispatch(login(values.password, values.number, webToken))
            console.log('after dispatch')
            setSubmitting(false)
            router.replace('/')
          } catch (err) {
            setError(err?.response?.data?.message ?? 'Something went Wrong')
          }
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit} className="px-4">
            <div className="space-y-5 md:space-y-8">
              <div className=" mt-6">
                <h1 className="text-xl font-normal">Log In</h1>
                <h3 className="mt-1 text-xs font-extralight text-secondaryText">
                  Don't have an account ?{' '}
                  <Link href="/auth/signup">
                    <span className="cursor-pointer text-primary underline ">
                      Create an account
                    </span>
                  </Link>
                </h3>
              </div>
              <AuthInput
                type="number"
                name="number"
                label="Phone Number"
                onChange={handleChange}
                onBlur={handleBlur}
                errors={errors}
                touched={touched}
                value={values.number}
              />

              <AuthInput
                type="password"
                name="password"
                label="Password"
                onChange={handleChange}
                errors={errors}
                touched={touched}
                onBlur={handleBlur}
                value={values.password}
              />
            </div>

            <Link href="/auth/forgot/number">
              <div className="mb-8 mt-2 cursor-pointer text-right text-xs font-medium text-gray-500 underline ">
                Forgot Password?
              </div>
            </Link>
            <button
              className=" flex h-10 w-full flex-col items-center justify-center rounded-lg bg-gradient  font-semibold text-white shadow-xl focus:outline-none "
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className=" flex items-center justify-center">
                  <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-gray-900"></div>
                </div>
              ) : (
                'Proceed'
              )}
            </button>
          </form>
        )}
      </Formik>
    </div>
  )
}
