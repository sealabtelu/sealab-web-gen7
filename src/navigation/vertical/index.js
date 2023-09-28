import { useState } from 'react'

import { AssistantMenu } from "../../router/routes/Assistant"
import { StudentMenu } from "../../router/routes/Student"

import { getUserData } from "@utils"

const pageMenu = () => {

  // ** State
  const [userData] = useState(getUserData(true))

  return userData.role === "Assistant" ? AssistantMenu : StudentMenu
}

export default pageMenu