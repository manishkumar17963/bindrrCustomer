import React from 'react'
import HeartIcon from '../icons/outline/heartIcon'

export default function LikeIcon({
  icon,
  children = <HeartIcon className="h-5 w-5" />,
  onClick = () => {},
}) {
  return (
    <div
      className="flex h-9 w-9 items-center justify-center rounded-full bg-opaque"
      onClick={onClick}
    >
      {children}
    </div>
  )
}
