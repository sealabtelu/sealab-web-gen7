import { lazy } from 'react'

import { Mail, Home } from "react-feather"

const HomeStudent = lazy(() => import("../../views/Home"))
const SecondPage = lazy(() => import("../../views/SecondPage"))
const Error = lazy(() => import("../../views/Error"))

const StudentRoutes = [
    {
        path: "/student/home",
        element: <HomeStudent />
    },
    {
        path: "/student/second-page",
        element: <SecondPage />
    },
    {
        path: "/error",
        element: <Error />,
        meta: {
            layout: "blank"
        }
    }
]

export const StudentMenu = [
    {
        id: "home",
        title: "Home",
        icon: <Home size={20} />,
        navLink: "/student/home"
    },
    {
        id: "secondPage",
        title: "Second Page",
        icon: <Mail size={20} />,
        navLink: "student/second-page"
    }
]

export default StudentRoutes
