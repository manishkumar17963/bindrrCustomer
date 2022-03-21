import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    loaded: false,
    isLoggedIn: false,
    username: null,
    webToken: null,
    location: null,
  },
  reducers: {
    login(state, action) {
      ;(state.isLoggedIn = true),
        (state.loaded = true),
        (state.token = action.payload?.token)
      state.username = action.payload?.username
    },
    loginWithLocation(state, action) {
      state.isLoggedIn = true
      ;(state.location = action.payload.location),
        (state.loaded = true),
        (state.token = action.payload?.token)
      state.username = action.payload?.username
    },
    logout(state, action) {
      return {
        token: null,
        isLoggedIn: false,

        webToken: state.webToken,
      }
    },
    setLocation(state, action) {
      ;(state.location = action.payload), (state.loaded = true)
    },
    setWebToken(state, action) {
      state.webToken = action.payload.webToken
    },
    setLoaded(state, action) {
      state.loaded = true
    },
  },
})

export const authActions = authSlice.actions

export default authSlice.reducer
