import React, { Fragment, useState } from 'react'
import * as Yup from 'yup'
import { Formik } from 'formik'
import { signUp } from '../../../store/actions/auth'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import Link from 'next/link'

import Popup from '../../../components/common/popup'
import ExclamationIcon from '../../../components/icons/outline/exclamationIcon'

import Image from 'next/image'

import AuthInput from '../../../components/auth/authInput'

const phoneRegExp = /^[6-9]\d{9}$/

const emailRegExp =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const SignupSchema = Yup.object().shape({
  username:
    Yup.string()
    .required('Required'),
  number: Yup.string()
    .matches(phoneRegExp, 'Phone number is not valid')
    .required('Required'),
  password: Yup.string()
    .min(6, 'Too Short!')
    .max(12, 'Too Long!')
    .required('Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Required'),
})

function Signup() {
  const router = useRouter()

  const [error, setError] = useState(false)
  const dispatch = useDispatch(null)

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
      <div className="h-screen border-2 border-white bg-background ">
        <div className=" relative h-56">
          <Image
            alt="Mountains"
            src={`/images/loginFrame.jpg`}
            layout="fill"
            objectFit="cover"
            className=" shadow-lg"
          />
        </div>

        <Formik
          initialValues={{
            number: '',
            password: '',
            username: '',
            confirmPassword: '',
          }}
          validationSchema={SignupSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              await signUp(values.username, values.number, values.password)
              setSubmitting(false)
              router.replace({
                pathname: '/auth/signup/verify',
                query: { number: values.number },
              })
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
              <div className="space-y-4 md:space-y-8">
                <div className=" mt-6">
                  <h1 className="text-xl font-normal">Create an account</h1>
                  <h3 className="mt-1 text-xs font-extralight text-secondaryText">
                    Already have an account?{' '}
                    <Link href="/auth/signup">
                      <span className="cursor-pointer text-primary underline ">
                        Login
                      </span>
                    </Link>
                  </h3>
                </div>
                <AuthInput
                  name="username"
                  label="Username"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.username}
                />
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
                  onBlur={handleBlur}
                  errors={errors}
                  touched={touched}
                  value={values.password}
                />

                <AuthInput
                  type="password"
                  name="confirmPassword"
                  label="Confirm Password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errors={errors}
                  touched={touched}
                  value={values.confirmPassword}
                />
              </div>

              <button
                className=" mt-8 flex h-10 w-full flex-col items-center justify-center rounded-lg bg-gradient  font-semibold text-white shadow-xl focus:outline-none "
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
    </Fragment>
  )
}

export default Signup
