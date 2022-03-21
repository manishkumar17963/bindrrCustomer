import Layout from '../components/layout/layout'
import '../styles/globals.css'
import wrapper from '../store/reducers'

import Head from 'next/head'
import { useEffect, useState } from 'react'
import { Fragment } from 'react'
import { useDispatch } from 'react-redux'

import { authActions } from '../store/reducers/auth'

function MyApp({ Component, pageProps }) {
  const dispatch = useDispatch(null)

  const [showPopup, setShowPopup] = useState(false)

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          let suggestion = {
            name: 'My Location',
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }
          console.log('suggestion', suggestion)
          const username = localStorage.getItem('username')
          const token = localStorage.getItem('token')
          if (token) {
            dispatch(
              authActions.loginWithLocation({
                token,
                isLoggedIn: true,
                username,
                location: suggestion,
              })
            )
          } else {
            dispatch(authActions.setLocation(suggestion))
          }
        },
        (value) => {
          const username = localStorage.getItem('username')
          const token = localStorage.getItem('token')
          if (token) {
            dispatch(authActions.login({ token, isLoggedIn: true, username }))
          } else {
            dispatch(authActions.setLoaded())
          }
        }
      )
    } else {
      const username = localStorage.getItem('username')
      const token = localStorage.getItem('token')
      if (token) {
        dispatch(authActions.login({ token, isLoggedIn: true, username }))
      } else {
        dispatch(authActions.setLoaded())
      }
    }
  }, [])

  return (
    <Fragment>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <meta name="keywords" content="Keywords" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <title>Your Destination our Cab</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Discover and Experience More" />
        <link rel="manifest" href="/manifest.json" />
        <link
          href="/icons/icon-64*64.png"
          rel="apple-touch-icon"
          sizes="64x64"
        />
        <link
          href="/icons/icon-32*32.png"
          rel="apple-touch-icon"
          sizes="32x32"
        />
        <link
          href="/icons/icon-128*128.png"
          rel="apple-touch-icon"
          sizes="128x128"
        />
        <link
          href="/icons/icon-256*256.png"
          rel="apple-touch-icon"
          sizes="256x256"
        />
        <link
          href="/icons/icon-512*512.png"
          rel="apple-touch-icon"
          sizes="512x512"
        />

        <meta name="theme-color" content="#317EFB" />
      </Head>

      <Layout showPopup={showPopup}>
        <Component {...pageProps} />
      </Layout>
    </Fragment>
  )
}

export default wrapper.withRedux(MyApp)
