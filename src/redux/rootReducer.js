// ** Reducers Imports
import layout from "./layout"
import navbar from "./navbar"
import auth from './authentication'
import module from "./api/module"
import homeAssignmentQuestion from "./api/homeAssignmentQuestion"
import preTestQuestion from "./api/preTestQuestion"

const rootReducer = {
    auth,
    navbar,
    layout,
    module,
    homeAssignmentQuestion,
    preTestQuestion
}

export default rootReducer
