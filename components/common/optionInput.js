function OptionInput({ name, value, handler, type, className }) {
  return (
    <div class="relative inline-block w-full">
      <select
        name={name}
        value={value}
        onChange={handler}
        class="focus:shadow-outline block h-12 w-full appearance-none rounded border-1px border-black border-opacity-5 bg-background  px-2  text-sm leading-tight text-black text-opacity-60 shadow-none  focus:outline-none"
      >
        {Object.keys(type).map((key) => (
          <option key={key} value={type[key]}>
            {key}
          </option>
        ))}
      </select>

      <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg
          class="h-4 w-4 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </div>
    </div>
  )
}

export function OptionInputWithLabel({
  name,
  label,
  value,
  handler,
  type,
  className2 = 'w-full',
  className = 'flex flex-col',
}) {
  return (
    <div className={className}>
      <label className="text-heading mb-1 text-opacity-70">{label}</label>
      <OptionInput
        name={name}
        value={value}
        handler={handler}
        type={type}
        className={className2}
      />
    </div>
  )
}

export default OptionInput
