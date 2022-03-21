import * as React from "react";

const Quote = (props) => (
  <svg
    width={64}
    height={64}
    className={props.className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M48 45.333h-8l-5.333-10.666v-16h16v16h-8L48 45.333Zm-21.333 0h-8l-5.334-10.666v-16h16v16h-8l5.334 10.666Z"
      fill="#F27405"
    />
  </svg>
);

export default Quote;
