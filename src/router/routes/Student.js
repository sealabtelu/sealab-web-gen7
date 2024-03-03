import { lazy } from "react"
import { Book, BookOpen, Bookmark, Code, Edit3, PenTool } from "react-feather"

const Score = lazy(() => import("../../views/pages/student/Score/Score"))
const HAQuestionList = lazy(() => import("../../views/pages/student/HomeAssignment/HAQuestionList"))
const PRTQuestionList = lazy(() => import("../../views/pages/student/PreTest/PRTQuestionList"))
const HomeAssigment = lazy(() => import("../../views/pages/student/HomeAssignment/HomeAssignment"))
const PreTest = lazy(() => import("../../views/pages/student/PreTest/PreTest"))
const Journal = lazy(() => import("../../views/pages/student/Journal/Journal"))
const Profile = lazy(() => import("../../views/pages/student/Profile/Profile"))
const CodePlayground = lazy(() => import('../../views/CodePlayground'))

const StudentRoutes = [
  {
    path: "/student/score",
    element: <Score />
  },
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
    path: "/student/code-playground",
    element: <CodePlayground />
  },
  {
    path: "/student/profile",
    element: <Profile />
  }
]

export const StudentMenu = [
  {
    id: "studentScore",
    title: "Score",
    icon: <Bookmark size={20} />,
    navLink: "/student/score"
  },
  {
    id: "homeAssignment",
    title: "Home Assignment",
    icon: <BookOpen size={20} />,
    navLink: "/student/home-assignment"
  },
  {
    id: "preTest",
    title: "Pre Test",
    icon: <Edit3 size={20} />,
    navLink: "/student/pre-test"
  },
  {
    id: "journal",
    title: "Journal",
    icon: <PenTool size={20} />,
    navLink: "/student/journal"
  },
  {
    id: "codePlayground",
    title: "Code Playground",
    icon: <Code size={20} />,
    navLink: "/student/code-playground"
  },
  {
    id: "labworkModule",
    title: "Labwork Module",
    icon: <Book size={20} />,
    navLink: "https://bit.ly/ModulIsmile2023",
    externalLink: true,
    newTab: true
  }
]

export default StudentRoutes.map((item) => ({
  ...item,
  meta: {
    role: "Student"
  }
}))
