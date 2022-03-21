import router from 'next/router'
import React from 'react'

function HeaderItem({ title, onClick }) {
  return (
    <div
      className="group flex cursor-pointer flex-col items-center py-2 duration-200 hover:font-bold hover:text-blue-900"
      onClick={onClick}
    >
      <p className="">{title}</p>
    </div>
  )
}

export default HeaderItem
