import React from 'react'
import moment from 'moment'
import HeartIcon from '../../components/icons/outline/heartIcon'

import Bookmark from '../../components/icons/outline/bookmark'

import Image from 'next/image'
import { useRouter } from 'next/router'
import ShareIcon from '../tab/share'
import DotsVertical from '../icons/outline/dotsVertical'
import HeartFilledIcon from '../icons/solid/heartFilledIcon'
import { BaseUrl } from '../../lib/constants'

export default function Post({ color = 'bg-card', post, toggleLikeHandler }) {
  const router = useRouter(null)
  return (
    <div className="bg-white py-4 px-4">
      <div
        className="mb-3 flex items-center"
        onClick={() => {
          router.push('/profile/1234567')
        }}
      >
        <div className="relative mr-2 h-10 w-10 overflow-hidden rounded-full bg-primary  shadow-lg ">
          <Image
            alt="Mountains"
            src="/images/profile.jpg"
            layout="fill"
            objectFit="cover"
            className=" shadow-lg"
          />
        </div>
        <div className="mr-2 flex-1 text-gray-600">
          <h1 className="  text-sm font-medium ">{post.ownerName}</h1>
          <h1 className="text-xs font-light">
            {moment(post.createdAt).format('DD MMMM yyyy')}
          </h1>
        </div>
        {post.distance && (
          <div className="mr-2 rounded-sm bg-secondary px-2 py-2 text-xs">
            {`${((post.distance ?? 0.0) / 1000).toFixed(1)} Km Away`}
          </div>
        )}
        {post.state && (
          <div className="rounded-sm bg-secondary  px-2 py-2 text-xs">
            {post.state}
          </div>
        )}
      </div>

      <div className="relative mt-3 mb-2 h-cardImage w-full overflow-hidden rounded-md bg-gray-300 shadow-lg ">
        <Image
          alt="Mountains"
          src={`${BaseUrl}/${post.imageUri}`}
          layout="fill"
          objectFit="cover"
          className="shadow-lg"
        />
      </div>
      {post.caption && (
        <h1 className="mt-3 mb-2 flex-1 text-sm font-normal ">
          {post.caption}
        </h1>
      )}
      <div className="mb-1 flex items-center space-x-3">
        {post.liked ? (
          <HeartFilledIcon
            className="h-6 w-6 text-red-500"
            onClick={() => toggleLikeHandler(false)}
          />
        ) : (
          <HeartIcon
            className="h-6 w-6"
            onClick={() => toggleLikeHandler(true)}
          />
        )}
        <div className="flex-1">
          <h1 className=" text-sm font-medium ">{post.count} Likes</h1>
        </div>
        <ShareIcon className="mr-6 w-5" />
      </div>
    </div>
  )
}
