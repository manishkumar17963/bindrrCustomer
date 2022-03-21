import React from 'react'
import Post from '../profile/post'

export default function AllPosts({ color = 'bg-card' }) {
  return (
    <div className="p-4 shadow-sm">
      <div className="space-y-3 text-xl font-medium ">
        <h1>Posts</h1>
        <div className="space-y-6">
          {[...Array(5).keys()].map((value, index) => (
            <Post key={index} color={color} />
          ))}
        </div>
      </div>
    </div>
  )
}
