import auth from '../helpers/auth'

import { useState } from 'react'

import Header from '../components/layout/header'

import BottomNav from '../components/layout/bottomNav'
import PickImage from '../components/common/pickImage'

import useHttp from '../hooks/useHttp'
import InfoPopup from '../components/common/infoPopup'
import { useSelector } from 'react-redux'
import { url } from '../store/actions/auth'
import axios from 'axios'

function Home() {
  const [image, setImage] = useState(null)
  const { isLoading, error, sendRequest: addApi, setError } = useHttp()
  const [caption, setCaption] = useState(undefined)
  const [success, setSuccess] = useState(null)
  const details = useSelector((state) => state.auth)

  const addPosts = async () => {
    if (!image) {
      setError('please choose image first')
      return
    }
    await addApi(
      {
        url: `${url}/artist/presigned/url`,
        headers: { Authorization: `Bearer ${details.token}` },
        body: { num: 1 },
        method: 'PUT',
      },
      async (data) => {
        console.log('images', data)
        await axios.put(data[0].url, image, {
          headers: { 'Content-Type': image.type },
        })

        await addApi(
          {
            url: `${url}/artist/add/post`,
            headers: { Authorization: `Bearer ${details.token}` },
            body: { imageUri: data[0].key, caption, point: details.location },
            method: 'POST',
          },
          (data) => {
            setSuccess('your post has been successfully uploaded')
          }
        )
      }
    )
  }
  return (
    <div className="mt-top h-screen overflow-scroll bg-white  pb-16">
      <InfoPopup
        success={success}
        error={error}
        successHandler={() => {
          setSuccess(null)
        }}
        errorHandler={() => {
          setError(null)
        }}
      />
      <Header searchOption={true} />
      <BottomNav />
      <PickImage
        changeFile={(value) => {
          setImage(value)
        }}
      />
      <div className="mt-4 px-4">
        <textarea
          className={`h-20 w-full rounded-md  border p-2  text-sm  text-black placeholder:text-xs placeholder:text-secondaryText focus:bg-green-200 focus:outline-none`}
          onChange={(e) => {
            setCaption(e.target.value)
          }}
          placeholder="Write Caption Here"
          value={caption}
        />
        <button
          className=" mt-4 flex h-10 w-full flex-col items-center justify-center rounded-lg bg-gradient  font-semibold text-white shadow-xl focus:outline-none "
          type="submit"
          onClick={addPosts}
          disabled={isLoading}
        >
          {isLoading ? (
            <div className=" flex items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-gray-900"></div>
            </div>
          ) : (
            'Proceed'
          )}
        </button>
      </div>
    </div>
  )
}

export const getServerSideProps = auth

export default Home
