import React, { useRef, useState } from 'react'

function PickImage({ index, changeFile }) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const fileInput = useRef(null)

  const handleFileChange = (event, selected) => {
    console.log('hello manish')
    const { target } = event
    const { files } = target
    console.log('event', event, selected)
    if (files && files[0]) {
      var reader = new FileReader()

      reader.onloadstart = () => setLoading(true)

      reader.onload = (event) => {
        setData(event.target.result)
        setLoading(false)
      }

      reader.readAsDataURL(files[0])
      changeFile(files[0])
    }
  }
  const backgroundImage = data ? { backgroundImage: `url(${data})` } : null
  return (
    <div className=" space-y-4 px-4 ">
      <div
        className="h-60 w-full rounded-md bg-gray-200 bg-cover bg-no-repeat "
        style={backgroundImage}
      ></div>

      <div
        className=" relative flex h-10    w-full flex-1 items-center justify-center rounded-md border-1px bg-secondary text-center text-sm font-medium "
        onClick={() => fileInput.current.click()}
      >
        Choose a Photo
        <input
          ref={fileInput}
          onChange={handleFileChange}
          type="file"
          className=" hidden"
        />
      </div>
    </div>
  )
}

export default PickImage
