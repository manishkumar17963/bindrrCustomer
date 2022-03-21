import React from 'react'
import Image from 'next/image'

import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'

function NotAuthenticated({
  page = '/auth/login',
  image = '/images/notAuth.svg',
  span1 = 'Please,Login Now to Get',
  span2 = 'Personalised Content',
  label = 'Login',
}) {
  const router = useRouter()
  const status = useSelector((state) => state.booking.statusData)
  return (
    <div className=" -mt-16 flex h-height flex-col items-center justify-center">
      <div className="relative h-56 w-5/6">
        <Image
          alt="Mountains"
          src={image}
          layout="fill"
          objectFit="contain"
          className="shadow-lg"
        />
      </div>
      {!status && <BottomNav />}
      <div className="mt-6 flex flex-col items-center space-y-6">
        <div className="flex flex-col items-center bg-gradient-to-r from-primary to-indigo-400 bg-clip-text text-lg font-semibold capitalize text-transparent drop-shadow-sm">
          <span>{span1}</span>
          {span2 != '' && <span> {span2}</span>}
        </div>
        <button
          className="text-focused rounded-full bg-gradient-to-r from-indigo-600 to-primary px-10 py-1 text-lg shadow-lg focus:outline-none"
          onClick={() => {
            router.replace(page)
          }}
        >
          {label}
        </button>
      </div>
    </div>
  )
}

export default NotAuthenticated
