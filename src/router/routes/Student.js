import { lazy } from 'react'
import { Book, Clipboard, BookOpen, FileText } from "react-feather"

const PRTQuestionList = lazy(() => import('../../views/pages/student/PreTest/PRTQuestionList'))
const HomeAssigment = lazy(() => import("../../views/pages/student/HomeAssignment"))
const PreTest = lazy(() => import("../../views/pages/student/PreTest"))
const Journal = lazy (() => import("../../views/pages/student/Journal"))
const Error = lazy(() => import("../../views/Error"))

const StudentRoutes = [
    {
        path: "/student/home-assignment",
        element: <HomeAssigment />
    },
    {
        path: "/student/pre-test",
        element: <PreTest />
    },
    {
        path: "/student/pre-test/questionList",
        element: <PRTQuestionList />
    },
    {
        path: "/student/journal",
        element: <Journal />
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
        id: "homeAssignment",
        title: "Home Assignment",
        icon: <BookOpen size={20} />,
        navLink: "/student/home-assignment"
    },
    {
        id: "preTest",
        title: "Pre Test",
        icon: <Clipboard size={20} />,
        navLink: "student/pre-test"
    },
    {
        id: "journal",
        title: "Journal",
        icon: <FileText size={20} />,
        navLink: "student/journal"
    },
    {
        id: "labworkModule",
        title: "Labwork Module",
        icon: <Book size={20} />,
        navLink: "https://drive.google.com/file/d/1ZbEN7-_Bd2Zv0Slb-aHuOabnwMjCgZ2w/view?usp=drive_link",
        target: "blank",
        rel: "noopener noreferrer"
    }
]

export default StudentRoutes.map(item => ({
    ...item,
    meta: {
        role: 'Student'
    }
}))
