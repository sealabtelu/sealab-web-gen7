import { lazy } from 'react'

import { Mail, Home } from "react-feather"

const HomeAssistant = lazy(() => import("../../views/Home"))
const SecondPage = lazy(() => import("../../views/SecondPage"))
const PreliminaryAssignment = lazy(() => import("../../views/pages/assistant/PreliminaryAssignment"))
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
        element: <PreliminaryAssignment />
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
        id: "secondPage",
        title: "Second Page",
        icon: <Mail size={20} />,
        navLink: "/assistant/second-page"
    },
    {
        id: "preliminaryAssignment",
        title: "Home Assignment",
        icon: <Mail size={20} />,
        navLink: "/assistant/preliminary-assignment"
    }
]

export default AssistantRoutes
