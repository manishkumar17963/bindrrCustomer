import React from 'react'

export default function Notification({ width = '20', height = '24' }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 68 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M32 78C36.4 78 40 74.4 40 70H24C24 74.4 27.6 78 32 78ZM56 54V34C56 21.72 49.48 11.44 38 8.72V6C38 2.68 35.32 0 32 0C28.68 0 26 2.68 26 6V8.72C14.56 11.44 8 21.68 8 34V54L0 62V66H64V62L56 54ZM48 58H16V34C16 24.08 22.04 16 32 16C41.96 16 48 24.08 48 34V58Z"
        fill="black"
      />
    </svg>
  )
}
