import { lazy } from "react"

import {
  Mail,
  Home,
  Clipboard,
  Bookmark,
  Edit3,
  PenTool,
  Book,
  AlertTriangle,
  User,
  Circle
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
const SelectGroup = lazy(() => import("../../views/pages/assistant/InputScore/SelectGroup"))
const InputScore = lazy(() => import("../../views/pages/assistant/InputScore/InputScore"))
const BAP = lazy(() => import("../../views/pages/assistant/BAP/BAP"))
const HasilInput = lazy(() => import("../../views/pages/assistant/HasilInput/HasilInput"))
const ViewNilai = lazy(() => import("../../views/pages/assistant/HasilInput/ViewNilai"))
const UpdateScore = lazy(() => import("../../views/pages/assistant/HasilInput/UpdateScore"))
const StudentList = lazy(() => import("../../views/pages/assistant/user/StudentList"))
const HomeDashboard = lazy(() => import("../../views/pages/assistant/user/Home"))

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
    id: "Home",
    title: "Home",
    icon: <Home size={20} />,
    navLink: "/assistant/home"
  },
  {
    id: "StudentInfo",
    title: "Student Info",
    icon: <User size={20} />,
    navLink: "/assistant/student-info"
  },
  {
    id: "homeAssignment",
    title: "Home Assignment",
    icon: <Clipboard size={20} />,
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
  {
    id: "preTest",
    title: "Pre Test",
    icon: <Edit3 size={20} />,
    children: [
      {
        id: 'preTestAdmin',
        title: 'Master Control',
        icon: <Circle />,
        navLink: "/assistant/pre-test/master-control"
      },
      {
        id: 'preTestSubmission',
        title: 'Submission',
        icon: <Circle />,
        navLink: "/assistant/pre-test/submission"
      }
    ]
  },
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
  },
  {
    id: "sanksiBermasalah",
    title: "Sanksi Bermasalah",
    icon: <AlertTriangle size={20} />,
    navLink: "https://bit.ly/CatatanPraktikanBermasalah",
    externalLink: true,
    newTab: true
  }
]

export default AssistantRoutes.map((item) => ({
  ...item,
  meta: {
    role: "Assistant"
  }
}))
