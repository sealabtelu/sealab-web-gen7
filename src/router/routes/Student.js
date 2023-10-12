import { lazy } from 'react'
import { Book, Clipboard, BookOpen, FileText } from "react-feather"

const HAQuestionList = lazy(() => import('../../views/pages/student/HomeAssignment/HAQuestionList'))
const PRTQuestionList = lazy(() => import('../../views/pages/student/PreTest/PRTQuestionList'))
const HomeAssigment = lazy(() => import("../../views/pages/student/HomeAssignment/HomeAssignment"))
const PreTest = lazy(() => import("../../views/pages/student/PreTest/PreTest"))
const Journal = lazy(() => import("../../views/pages/student/Journal/Journal"))
const Profile = lazy(() => import("../../views/pages/student/Profile/AccountTabContent"))

const StudentRoutes = [
    {
        path: "/student/home-assignment",
        element: <HomeAssigment />
    },
    {
        path: "/student/home-assignment/questionList",
        element: <HAQuestionList />
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
        path: "/student/profile",
        element: <Profile />
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
        externalLink: true,
        newTab: true
    },
    {
        id: "profile",
        title: "Profile",
        icon: <Book size={20} />,
        navLink: "student/profile"
    }
]

export default StudentRoutes.map(item => ({
    ...item,
    meta: {
        role: 'Student'
    }
}))
