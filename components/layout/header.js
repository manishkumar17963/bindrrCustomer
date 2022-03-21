/* This example requires Tailwind CSS v2.0+ */
import { useCallback, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'

export default function Header({ color = 'bg-white' }) {
  const router = useRouter()

  const cancelhandler = useCallback(() => {
    setShowDrawer(false)
  })

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 flex w-full items-center justify-between px-4 py-3 ${color} md:shadow-sm`}
    >
      <h1 className="flex w-full justify-center text-center  text-xl font-medium uppercase">
        Bindrr
      </h1>
      {/* <Message
        className="h-5 w-5 text-gray-600 "
        onClick={() => {
          router.push('/message')
        }}
      /> */}
    </header>
  )
}
