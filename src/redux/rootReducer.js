// ** Reducers Imports
import layout from "./layout"
import navbar from "./navbar"
import auth from './authentication'
import module from "./api/module"

const rootReducer = { auth, navbar, layout, module }

export default rootReducer
