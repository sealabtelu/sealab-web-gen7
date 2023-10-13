import { lazy } from 'react'

import { Mail, Home, Clipboard, Bookmark, Edit3, PenTool, Book } from "react-feather"

const HAModuleList = lazy(() => import("../../views/pages/assistant/HomeAssignment/HAModuleList"))
const HAQuestionList = lazy(() => import("../../views/pages/assistant/HomeAssignment/HAQuestionList"))
const HAQuestion = lazy(() => import("../../views/pages/assistant/HomeAssignment/HAQuestion"))
const PRTModuleList = lazy(() => import("../../views/pages/assistant/PreTest/PRTModuleList"))
const PRTQuestionList = lazy(() => import("../../views/pages/assistant/PreTest/PRTQuestionList.js"))
const PRTQuestion = lazy(() => import("../../views/pages/assistant/PreTest/PRTQuestion"))
const SelectGroup = lazy(() => import("../../views/pages/assistant/InputScore/SelectGroup"))
const InputScore = lazy(() => import("../../views/pages/assistant/InputScore/InputScore"))
const BAP = lazy(() => import("../../views/pages/assistant/BAP/BAP"))
const HasilInput = lazy(() => import("../../views/pages/assistant/HasilInput/HasilInput"))
const ViewNilai = lazy(() => import("../../views/pages/assistant/HasilInput/ViewNilai"))
const UpdateScore = lazy(() => import("../../views/pages/assistant/HasilInput/UpdateScore"))
const StudentList = lazy(() => import("../../views/pages/assistant/user/StudentList"))

const AssistantRoutes = [
    {
        path: "/assistant/home",
        element: <StudentList />
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
        path: "/assistant/preliminary-assignment/question/:action",
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
        path: "/assistant/pre-test/question/:action",
        element: <PRTQuestion />
    },
    {
        path: "/assistant/select-group",
        element: <SelectGroup />
    },
    {
        path: "/assistant/select-group/input-score",
        element: <InputScore />
    },
    {
        path: "/assistant/BAP",
        element: <BAP />
    },
    {
        path: "/assistant/hasil-input",
        element: <HasilInput />
    },
    {
        path: "/assistant/hasil-input/view-nilai",
        element: <ViewNilai />
    },
    {
        path: "/assistant/hasil-input/update-score",
        element: <UpdateScore />
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
    // {
    //     id: "journal",
    //     title: "Journal",
    //     icon: <PenTool size={20} />,
    //     // navLink: "/assistant/student"
    // },
    {
        id: "inputScore",
        title: "Input Score",
        icon: <Clipboard size={20} />,
        navLink: "/assistant/select-group"
    },
    {
        id: "bap",
        title: "BAP",
        icon: <Bookmark size={20} />,
        navLink: "/assistant/BAP"
    },
    {
        id: "hasilInput",
        title: "Hasil Input",
        icon: <Bookmark size={20} />,
        navLink: "/assistant/hasil-input"
    }
]

export default AssistantRoutes.map(item => ({
    ...item,
    meta: {
        role: 'Assistant'
    }
}))