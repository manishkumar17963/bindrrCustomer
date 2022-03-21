import * as React from "react";

const Direction = (props) => (
  <svg
    width={42}
    height={42}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M24.5 25.375V21h-7v5.25H14v-7a1.75 1.75 0 0 1 1.75-1.75h8.75v-4.375l6.125 6.125-6.125 6.125Zm13.492-5.617-15.75-15.75h-.017a1.743 1.743 0 0 0-2.468 0l-15.75 15.75a1.764 1.764 0 0 0 0 2.485l15.75 15.75a1.78 1.78 0 0 0 2.485 0l15.75-15.75a1.764 1.764 0 0 0 0-2.485Z"
      fill="#F27405"
    />
  </svg>
);

export default Direction;
