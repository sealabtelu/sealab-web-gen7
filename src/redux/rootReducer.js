// ** Reducers Imports
import layout from "./layout"
import navbar from "./navbar"
import module from "./api/module"
import homeAssignmentQuestion from "./api/homeAssignmentQuestion"
import homeAssignmentAnswer from "./api/homeAssignmentAnswer"
import journalAnswer from "./api/journalAnswer"
import preTestQuestion from "./api/preTestQuestion"
import preTestAnswer from "./api/preTestAnswer"
import gformSurvey from "./api/gformSurvey"
import seelabs from "./api/seelabs"
import swagger from "./api/swagger"
import user from "./api/user"

const rootReducer = {
  navbar,
  layout,
  module,
  homeAssignmentQuestion,
  homeAssignmentAnswer,
  journalAnswer,
  preTestQuestion,
  preTestAnswer,
  gformSurvey,
  seelabs,
  swagger,
  user
}

export default rootReducer
