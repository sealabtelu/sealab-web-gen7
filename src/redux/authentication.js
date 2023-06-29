// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'

// ** UseJWT import to get config
import useJwt from '@src/auth/jwt/useJwt'

const config = useJwt.jwtConfig

const initialUser = () => {
  const item = window.localStorage.getItem('userData')
  //** Parse stored json or if none return initialValue
  return item ? JSON.parse(item) : {}
}

export const authSlice = createSlice({
  name: 'authentication',
  initialState: {
    userData: initialUser()
  },
  reducers: {
    handleLogin: (state, action) => {
      state.userData = action.payload
      console.log(action.payload)
      console.log(action.payload[config.storageTokenKeyName])
      state[config.storageTokenKeyName] = action.payload[config.storageTokenKeyName]
      localStorage.setItem('userData', JSON.stringify(action.payload))
      localStorage.setItem(config.storageTokenKeyName, JSON.stringify(action.payload.appToken))
    },
    handleLogout: state => {
      state.userData = {}
      state[config.storageTokenKeyName] = null
      // ** Remove user, accessToken & refreshToken from localStorage
      localStorage.removeItem('userData')
      localStorage.removeItem(config.storageTokenKeyName)
    }
  }
})

export const { handleLogin, handleLogout } = authSlice.actions

export default authSlice.reducer
