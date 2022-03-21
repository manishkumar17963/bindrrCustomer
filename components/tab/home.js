import React from 'react'

export default function Home({ width = '22', height = '20', className = '' }) {
  return (
    <svg
      width={width}
      height={height}
      className={className}
      viewBox="0 0 80 68"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M40 10.76L60 28.76V60H52V36H28V60H20V28.76L40 10.76ZM40 0L0 36H12V68H36V44H44V68H68V36H80L40 0Z"
        fill=""
      />
    </svg>
  )
}
