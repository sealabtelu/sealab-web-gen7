// ** Reducers Imports
import layout from "./layout"
import navbar from "./navbar"
import auth from './authentication'
import module from "./api/module"
import homeAssignmentQuestion from "./api/homeAssignmentQuestion"

const rootReducer = {
    auth,
    navbar,
    layout,
    module,
    homeAssignmentQuestion
}

export default rootReducer
