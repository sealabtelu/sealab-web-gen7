import { lazy } from "react"

import {
  Home,
  Clipboard,
  Bookmark,
  Edit3,
  PenTool,
  Book,
  AlertTriangle,
  User,
  Circle,
  BookOpen,
  Paperclip,
  Star,
  FileText,
  Code
} from "react-feather"

const HAModuleList = lazy(() => import("../../views/pages/assistant/HomeAssignment/HAModuleList"))
const HAQuestionList = lazy(() => import("../../views/pages/assistant/HomeAssignment/HAQuestionList"))
const HAQuestion = lazy(() => import("../../views/pages/assistant/HomeAssignment/HAQuestion"))
const HASubmissionList = lazy(() => import("../../views/pages/assistant/HomeAssignment/HASubmissionList"))
const PRTModuleList = lazy(() => import("../../views/pages/assistant/PreTest/PRTModuleList"))
const PRTQuestionList = lazy(() => import("../../views/pages/assistant/PreTest/PRTQuestionList.js"))
const PRTQuestion = lazy(() => import("../../views/pages/assistant/PreTest/PRTQuestion"))
const PRTSubmissionList = lazy(() => import("../../views/pages/assistant/PreTest/PRTSubmissionList"))
const JModuleList = lazy(() => import("../../views/pages/assistant/Jurnal/JModuleList"))
const JSubmissionList = lazy(() => import("../../views/pages/assistant/Jurnal/JSubmissionList"))
const SelectGroup = lazy(() => import("../../views/pages/assistant/Score/SelectGroup"))
const InputScore = lazy(() => import("../../views/pages/assistant/Score/InputScore"))
const InputResult = lazy(() => import("../../views/pages/assistant/Score/InputResult"))
const InputPreview = lazy(() => import("../../views/pages/assistant/Score/InputPreview"))
const InputOverview = lazy(() => import("../../views/pages/assistant/Score/InputOverview"))
const UpdateScore = lazy(() => import("../../views/pages/assistant/Score/UpdateScore"))
const BAP = lazy(() => import("../../views/pages/assistant/BAP/BAP"))
const StudentList = lazy(() => import("../../views/pages/assistant/user/StudentList"))
const ProctorSchedule = lazy(() => import("../../views/pages/assistant/Proctor/Proctor"))
const HomeDashboard = lazy(() => import("../../views/pages/assistant/user/Home"))
const Swagger = lazy(() => import("../../views/pages/assistant/Swagger/Swagger"))
const CodePlayground = lazy(() => import('../../views/CodePlayground'))

const AssistantRoutes = [
  {
    path: "/assistant/home",
    element: <HomeDashboard />
  },
  {
    path: "/assistant/student-info",
    element: <StudentList />
  },
  {
    path: "/assistant/proctor/schedule",
    element: <ProctorSchedule />
  },
  {
    path: "/assistant/preliminary-assignment/master-control",
    element: <HAModuleList />
  },
  {
    path: "/assistant/preliminary-assignment/master-control/question-list",
    element: <HAQuestionList />
  },
  {
    path: "/assistant/preliminary-assignment/master-control/question/:action",
    element: <HAQuestion />
  },
  {
    path: "/assistant/preliminary-assignment/submission",
    element: <HASubmissionList />
  },
  {
    path: "/assistant/pre-test/master-control",
    element: <PRTModuleList />
  },
  {
    path: "/assistant/pre-test/master-control/question-list",
    element: <PRTQuestionList />
  },
  {
    path: "/assistant/pre-test/master-control/question/:action",
    element: <PRTQuestion />
  },
  {
    path: "/assistant/pre-test/submission",
    element: <PRTSubmissionList />
  },
  {
    path: "/assistant/journal/master-control",
    element: <JModuleList />
  },
  {
    path: "/assistant/journal/submission",
    element: <JSubmissionList />
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
    path: "/assistant/input-overview",
    element: <InputOverview />
  },
  {
    path: "/assistant/input-result",
    element: <InputResult />
  },
  {
    path: "/assistant/input-result/preview",
    element: <InputPreview />
  },
  {
    path: "/assistant/input-result/update-score",
    element: <UpdateScore />
  },
  {
    path: "/assistant/BAP",
    element: <BAP />
  },
  {
    path: "/assistant/code-playground",
    element: <CodePlayground />
  },
  {
    path: "/assistant/swagger",
    element: <Swagger />
  }
]

export const AssistantMenu = [
  {
    id: "Home",
    title: "Home",
    icon: <Home size={20} />,
    navLink: "/assistant/home"
  },
  {
    id: "studentInfo",
    title: "Student Info",
    icon: <User size={20} />,
    navLink: "/assistant/student-info"
  },
  {
    id: "proctorSchedule",
    title: "Proctor",
    icon: <Paperclip size={20} />,
    navLink: "/assistant/proctor/schedule"
  },
  {
    id: "homeAssignment",
    title: "Home Assignment",
    icon: <BookOpen size={20} />,
    children: [
      {
        id: 'homeAssignmentAdmin',
        title: 'Master Control',
        icon: <Circle />,
        navLink: "/assistant/preliminary-assignment/master-control"
      },
      {
        id: 'homeAssignmentSubmission',
        title: 'Submission',
        icon: <Circle />,
        navLink: "/assistant/preliminary-assignment/submission"
      }
    ]
  },
  // {
  //   id: "preTest",
  //   title: "Pre Test",
  //   icon: <Edit3 size={20} />,
  //   children: [
  //     {
  //       id: 'preTestAdmin',
  //       title: 'Master Control',
  //       icon: <Circle />,
  //       navLink: "/assistant/pre-test/master-control"
  //     },
  //     {
  //       id: 'preTestSubmission',
  //       title: 'Submission',
  //       icon: <Circle />,
  //       navLink: "/assistant/pre-test/submission"
  //     }
  //   ]
  // },
  {
    id: "journal",
    title: "Journal",
    icon: <PenTool size={20} />,
    children: [
      {
        id: 'journalAdmin',
        title: 'Master Control',
        icon: <Circle />,
        navLink: "/assistant/journal/master-control"
      },
      {
        id: 'journalSubmission',
        title: 'Submission',
        icon: <Circle />,
        navLink: "/assistant/journal/submission"
      }
    ]
  },
  {
    id: "inputScore",
    title: "Input Score",
    icon: <FileText size={20} />,
    navLink: "/assistant/select-group"
  },
  {
    id: "inputResult",
    title: "Input Result",
    icon: <Clipboard size={20} />,
    navLink: "/assistant/input-result"
  },
  {
    id: "inputOverview",
    title: "Input Overview",
    icon: <Star size={20} />,
    navLink: "/assistant/input-overview"
  },
  {
    id: "bap",
    title: "BAP",
    icon: <Bookmark size={20} />,
    navLink: "/assistant/BAP"
  },
  {
    id: "sanksiBermasalah",
    title: "Sanksi Bermasalah",
    icon: <AlertTriangle size={20} />,
    navLink: "https://bit.ly/CatatanMasalahPraktikanAlpro2024",
    externalLink: true,
    newTab: true
  },
  {
    id: "codePlayground",
    title: "Code Playground",
    icon: <Code size={20} />,
    navLink: "/assistant/code-playground"
  },
  {
    id: "swagger",
    title: "API Docs",
    icon: <Book size={20} />,
    navLink: "/assistant/swagger"
  }
]

export default AssistantRoutes.map((item) => ({
  ...item,
  meta: {
    role: "Assistant"
  }
}))
