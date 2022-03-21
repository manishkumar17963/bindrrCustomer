import React from 'react'

export default function Message({
  width = '20',
  height = '20',
  className = '',
}) {
  return (
    <svg
      width={width}
      className={className}
      height={height}
      viewBox="0 0 80 80"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 8H72V56H12.68L8 60.68V8ZM8 0C3.6 0 0.04 3.6 0.04 8L0 80L16 64H72C76.4 64 80 60.4 80 56V8C80 3.6 76.4 0 72 0H8ZM16 40H64V48H16V40ZM16 28H64V36H16V28ZM16 16H64V24H16V16Z"
        fill="currentColor"
      />
    </svg>
  )
}
