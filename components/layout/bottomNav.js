import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Home from '../tab/home'

import Search from '../tab/search'
import Add from '../tab/add'
import Notification from '../tab/notification'
import Image from 'next/image'

const tabs = [
  { url: '/', icon: Home },
  { url: '/', icon: Notification },
  { url: '/add', icon: Add },
  { url: '/', icon: Search },
]

function NavItem({
  selected = false,

  Icon,
  clickHandler,
}) {
  return (
    <div
      className=""
      onClick={() => {
        clickHandler()
      }}
    >
      <div
        className={`${
          selected &&
          '-mt-7 mb-2  rounded-full border-2  border-white  bg-buttonGradient px-3 py-3 shadow-sm'
        }`}
      >
        <Icon color={selected && 'text-white'} />
      </div>
    </div>
  )
}

function BottomNav() {
  const [selected, setSelected] = useState(2)
  const router = useRouter(null)

  useEffect(() => {
    console.log('calling useEffect')
    const index = tabs.findIndex((item) => item.url == router.pathname)
    setSelected(2)
  }, [router.pathname])

  function clickHandler(index) {
    router.push(tabs[index].url)
  }
  return (
    <div className="fixed inset-x-0 bottom-0 z-20 flex items-center justify-between bg-white px-4 py-4 shadow-card md:hidden">
      <NavItem
        title={tabs[0].name}
        Icon={tabs[0].icon}
        href={tabs[0].url}
        selected={false}
        clickHandler={() => clickHandler(0)}
      />
      <NavItem
        title={tabs[1].name}
        Icon={tabs[1].icon}
        href={tabs[1].url}
        selected={false}
        clickHandler={() => clickHandler(1)}
      />
      <div className="relative" onClick={(e) => {}}>
        <NavItem
          title={tabs[2].name}
          Icon={tabs[2].icon}
          href={tabs[2].url}
          selected={true}
          clickHandler={() => {
            clickHandler(2)
          }}
        />
      </div>

      <NavItem
        title={tabs[3].name}
        Icon={tabs[3].icon}
        href={tabs[3].url}
        selected={false}
        clickHandler={() => clickHandler(3)}
      />
      <div className="relative h-5 w-5 overflow-hidden rounded-full  ">
        <Image
          alt="Mountains"
          src="/images/profile.jpg"
          layout="fill"
          objectFit="cover"
          className=" shadow-lg"
        />
      </div>
    </div>
  )
}

export default BottomNav
