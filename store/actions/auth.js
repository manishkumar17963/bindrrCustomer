import { authActions } from '../reducers/auth'

import axios from 'axios'
import router from 'next/router'
export const url = 'https://bindrrbackend.herokuapp.com'
//'http://localhost:3000'

export const baseUrl = 'https://localhost:3000'

let timer

export const signUp = async (username, number, password, accept) => {
  var bodyJsonData = { username, number, password, accept }
  try {
    console.log(bodyJsonData)
    const response = await axios({
      method: 'post',
      url: `/api/auth/signup`,
      data: bodyJsonData,
    })
  } catch (err) {
    console.log(err)
    throw err
  }
}

export const forgot = async (number) => {
  var bodyJsonData = { number }
  try {
    const response = await axios({
      method: 'post',
      url: `/api/auth/forgotOtp`,
      data: bodyJsonData,
    })
  } catch (err) {
    console.log(err)

    throw err
  }
}

export const forgotVerify = async (payload) => {
  var bodyJsonData = { ...payload }
  try {
    const response = await axios({
      method: 'post',
      url: `/api/auth/verifyForgot`,
      data: bodyJsonData,
    })
  } catch (err) {
    throw err
  }
}

export const verify = async (code, number) => {
  var bodyJsonData = { code, number }
  try {
    const response = await axios({
      method: 'post',
      url: `/api/auth/verify`,
      data: bodyJsonData,
    })
    return response.data.message
  } catch (err) {
    let message = 'Something went wrong!'
    throw err
  }
}

export const authenticate = (token, isLoggedIn, username) => {
  return (dispatch) => {
    dispatch(authActions.login({ token, isLoggedIn, username }))
  }
}

export const saveWebTokenToStore = (webToken) => {
  return (dispatch) => {
    dispatch(authActions.setWebToken({ webToken }))
  }
}

export const login = (password, number, webToken) => {
  return async (dispatch) => {
    let bodyJsonData = { password, number, webToken }
    try {
      let response = await axios({
        method: 'post',
        url: `/api/auth/login`,
        data: bodyJsonData,
        withCredentials: true,
      })
      console.log('response header', response.headers['set-cookie'])
      console.log(response.data)

      dispatch(
        authenticate(
          response.data.token,
          !!response.data.token,
          response.data?.username ?? 'No User'
        )
      )

      saveDataToStorage(response.data.token, response.data?.username)
    } catch (err) {
      console.log('err', err)
      throw err
    }
  }
}

export const logout = (token) => {
  return async (dispatch) => {
    await axios.post(
      '/api/auth/logout',
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    dispatch(authActions.logout())
    router.replace('/auth/login')
  }
}

const saveDataToStorage = (token, username) => {
  localStorage.setItem('token', token)
  localStorage.setItem('username', username)
}
