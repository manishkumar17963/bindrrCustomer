import { useEffect, useState } from 'react'
import { ViewType } from '../enum'
import Feed from '../components/main/feed'
import LoadingPopup from '../components/common/loading'

import Header from '../components/layout/header'

import BottomNav from '../components/layout/bottomNav'
import { useSelector } from 'react-redux'
import { url } from '../store/actions/auth'
import useHttp from '../hooks/useHttp'
import ShieldCheckIcon from '../components/icons/outline/shieldCheckIcon'
import Popup from '../components/common/popup'
import EmojiSadIcon from '../components/icons/outline/emojiSadIcon'
import { useRouter } from 'next/router'
import axios from 'axios'

function Home() {
  const { isLoading, error, sendRequest: homeApi, setError } = useHttp()
  const detail = useSelector((state) => state.auth)
  const [posts, setPosts] = useState(null)
  const [authPopup, showAuthPopup] = useState(false)
  const router = useRouter(null)

  function changeViewType(view) {
    setViewType(view)
  }

  async function toggleLikeHandler(add, index) {
    if (detail.isLoggedIn) {
      if (posts?.[index]) {
        await axios({
          url: `${url}/artist/${add ? 'add' : 'remove'}/like/${
            posts[index]._id
          }`,
          method: 'post',
          headers: {
            Authorization: `Bearer ${detail.token}`,
          },
        })
        const newPosts = [
          ...posts.slice(0, index),
          {
            ...posts[index],
            liked: !posts[index].liked,
            count: add ? posts[index].count + 1 : posts[index].count - 1,
          },
          ...posts.slice(index + 1),
        ]
        console.log('value', index, newPosts)
        setPosts(newPosts)
      }
    } else {
      showAuthPopup(true)
    }
  }

  const goToLoginPage = (show) => {
    if (show) {
      router.push('/auth/login')
    } else {
    }
    showAuthPopup(false)
  }

  useEffect(async () => {
    if (detail.loaded) {
      console.log('working')
      let uri
      let headers = {}
      if (!detail.isLoggedIn) {
        uri = `${url}/artist/initial/unauth/data`
      } else {
        uri = `${url}/artist/initial/auth/data`
        headers = { Authorization: `Bearer ${detail.token}` }
      }
      await homeApi(
        {
          url: uri,
          headers: headers,
          body: { position: detail.location },
          method: 'POST',
        },
        (data) => {
          console.log('data', data)
          setPosts(data)
        }
      )
    }
  }, [detail])

  return (
    <div className="mt-top h-screen overflow-scroll bg-white  pb-16">
      {(!posts || isLoading) && (
        <LoadingPopup
          Icon={ShieldCheckIcon}
          label="Hold on, I will Fetch Posts.."
        />
      )}
      {authPopup && (
        <Popup
          onPressAnyOption={goToLoginPage}
          message="Please Login First to like Post"
          title="Not Registered"
          okMessage="Ok"
          cancelMessage="Cancel"
          Icon={EmojiSadIcon}
        />
      )}
      <Header
        searchOption={true}
        changeViewHandler={(value) => {
          changeViewType(value)
        }}
      />
      <BottomNav />
      {<Feed posts={posts} toggleLikeHandler={toggleLikeHandler} />}
    </div>
  )
}

export default Home
