import React, { Fragment, useState } from 'react'
import EyeIcon from '../icons/outline/eyeIcon'
import EyeOffIcon from '../icons/outline/eyeOffIcon'

export default function AuthInput({
  label,
  name,
  type,
  onBlur,
  onChange,
  errors,
  touched,
  className = 'bg-white border-1px border-black border-opacity-5',
  value,
}) {
  const [inputType, setInputType] = useState(type)
  let body
  if (type == 'password') {
    body = (
      <div
        className={`flex items-center overflow-hidden rounded-md pr-2 text-black  text-opacity-60 ${className} `}
      >
        <input
          type={inputType}
          name={name}
          className="h-12 flex-1 border-none pl-2 text-sm placeholder:text-xs placeholder:text-secondaryText  focus:border-none focus:bg-green-100 focus:outline-none"
          onBlur={onBlur}
          onChange={onChange}
          placeholder={label}
          value={value}
        />
        {inputType == 'text' ? (
          <EyeOffIcon
            className="m-1 h-5 w-5 text-gray-400"
            onClick={() => setInputType('password')}
          />
        ) : (
          <EyeIcon
            className="m-1 h-5 w-5 text-gray-400"
            onClick={() => setInputType('text')}
          />
        )}
      </div>
    )
  } else {
    body = (
      <input
        type={inputType}
        name={name}
        className={` h-12 w-full rounded-md  px-2 text-sm  text-black placeholder:text-xs placeholder:text-secondaryText focus:bg-green-200 focus:outline-none ${className}`}
        onBlur={onBlur}
        onChange={onChange}
        placeholder={label}
        value={value}
      />
    )
  }
  return (
    <Fragment>
      {body}
      {/* {errors[name] && touched[name] && (
                <span className="text-red-500">{errors[name]}</span>
              )} */}
    </Fragment>
  )
}
