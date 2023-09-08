import { lazy } from 'react'

import { Mail, Home, Clipboard, Bookmark, Edit3, PenTool, Book } from "react-feather"

const HomeAssistant = lazy(() => import("../../views/pages/praktikan/TugasPendahuluan"))
const SecondPage = lazy(() => import("../../views/pages/praktikan/TesAwal"))
const ModuleList = lazy(() => import("../../views/pages/assistant/PreliminaryAssignment/ModuleList"))
const QuestionList = lazy(() => import("../../views/pages/assistant/PreliminaryAssignment/QuestionList"))
const Question = lazy(() => import("../../views/pages/assistant/PreliminaryAssignment/Question"))
const Error = lazy(() => import("../../views/Error"))

const AssistantRoutes = [
    {
        path: "/assistant/home",
        element: <HomeAssistant />
    },
    {
        path: "/assistant/second-page",
        element: <SecondPage />
    },
    {
        path: "/assistant/preliminary-assignment",
        element: <ModuleList />
    },
    {
        path: "/assistant/preliminary-assignment/question-list/:id",
        element: <QuestionList />
    },
    {
        path: "/assistant/preliminary-assignment/question",
        element: <Question />
    },
    {
        path: "/error",
        element: <Error />,
        meta: {
            layout: "blank"
        }
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
        id: "moduleList",
        title: "Home Assignment",
        icon: <Clipboard size={20} />,
        navLink: "/assistant/preliminary-assignment"
    },
    {
        id: "preTest",
        title: "Pre Test",
        icon: <Edit3 size={20} />,
        // navLink: "/assistant/preliminary-assignment/question-list"
    },
    {
        id: "journal",
        title: "Journal",
        icon: <PenTool size={20} />,
        // navLink: "/assistant/preliminary-assignment/question"
    },
    {
        id: "inputScore",
        title: "Input Score",
        icon: <Clipboard size={20} />,
        // navLink: "/assistant/journal"
    },
    {
        id: "bap",
        title: "BAP",
        icon: <Bookmark size={20} />,
        // navLink: "/assistant/journal"
    }
]

export default AssistantRoutes
