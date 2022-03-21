import React, { Fragment } from 'react'

import Post from '../profile/post'

export default function Feed({ posts, toggleLikeHandler }) {
  return (
    <div className="space-y-6  bg-background">
      {(posts ?? []).map((value, index) => (
        <Post
          key={value._id}
          post={value}
          toggleLikeHandler={(value) => {
            console.log(value)
            toggleLikeHandler(value, index)
          }}
        />
      ))}
    </div>
  )
}
