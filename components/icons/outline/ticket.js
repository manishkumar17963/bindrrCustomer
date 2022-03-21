import * as React from "react";

const Ticket = (props) => (
  <svg
    width={26}
    height={23}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M15.58 16.8 12 14.5l-3.58 2.3 1.08-4.12L6.21 10l4.25-.26L12 5.8l1.54 3.94 4.25.26-3.29 2.68 1.08 4.12ZM20 12a2 2 0 0 1 2-2V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v4a2 2 0 1 1 0 4v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 1-2-2Z"
      fill="currentColor"
    />
  </svg>
);

export default Ticket;
