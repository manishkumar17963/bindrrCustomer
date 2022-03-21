import * as React from "react";

const Menu = (props) => (
  <svg
    width={36}
    height={39}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
    onClick={props.onClick}
  >
    <path
      d="M4.5 10.15h27v3.15h-27v-3.15Zm0 7.874h27v3.15h-27v-3.15Zm0 7.875h27v3.15h-27v-3.15Z"
      fill="#A67246"
    />
  </svg>
);

export default Menu;
