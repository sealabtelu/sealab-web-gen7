import { lazy } from 'react'

import { Mail, Home, Clipboard, Bookmark, Edit3, PenTool, Book } from "react-feather"

const HomeAssistant = lazy(() => import("../../views/pages/student/HomeAssignment/HomeAssignment"))
const HAModuleList = lazy(() => import("../../views/pages/assistant/HomeAssignment/HAModuleList"))
const HAQuestionList = lazy(() => import("../../views/pages/assistant/HomeAssignment/HAQuestionList"))
const HAQuestion = lazy(() => import("../../views/pages/assistant/HomeAssignment/HAQuestion"))
const PRTModuleList = lazy(() => import("../../views/pages/assistant/PreTest/PRTModuleList"))
const PRTQuestionList = lazy(() => import("../../views/pages/assistant/PreTest/PRTQuestionList.js"))
const PRTQuestion = lazy(() => import("../../views/pages/assistant/PreTest/PRTQuestion"))
const PilihGroup = lazy(() => import("../../views/pages/assistant/InputScore/PilihGroup"))
const InputNilai = lazy(() => import("../../views/pages/assistant/InputScore/InputNilai"))
const Error = lazy(() => import("../../views/Error"))

const AssistantRoutes = [
    {
        path: "/assistant/home",
        element: <HomeAssistant />
    },
    {
        path: "/assistant/preliminary-assignment",
        element: <HAModuleList />
    },
    {
        path: "/assistant/preliminary-assignment/question-list",
        element: <HAQuestionList />
    },
    {
        path: "/assistant/preliminary-assignment/question",
        element: <HAQuestion />
    },
    {
        path: "/assistant/pre-test",
        element: <PRTModuleList />
    },
    {
        path: "/assistant/pre-test/question-list",
        element: <PRTQuestionList />
    },
    {
        path: "/assistant/pre-test/question",
        element: <PRTQuestion />
    },
    {
        path: "/assistant/pilih-group",
        element: <PilihGroup />
    },
    {
        path: "/assistant/pilih-group/input-nilai",
        element: <InputNilai />
    }
]

export const AssistantMenu = [
    {
        id: "home",
        title: "Home",
        icon: <Home size={20} />,
        navLink: "/assistant/home"
    },
    {
        id: "homeAssignment",
        title: "Home Assignment",
        icon: <Clipboard size={20} />,
        navLink: "/assistant/preliminary-assignment"
    },
    {
        id: "preTest",
        title: "Pre Test",
        icon: <Edit3 size={20} />,
        navLink: "/assistant/pre-test"
    },
    {
        id: "journal",
        title: "Journal",
        icon: <PenTool size={20} />
        // navLink: "/assistant/preliminary-assignment/question"
    },
    {
        id: "inputScore",
        title: "Input Score",
        icon: <Clipboard size={20} />,
        navLink: "/assistant/pilih-group"
    },
    {
        id: "bap",
        title: "BAP",
        icon: <Bookmark size={20} />
        // navLink: "/assistant/journal"
    }
]

export default AssistantRoutes.map(item => ({
    ...item,
    meta: {
        role: 'Assistant'
    }
}))