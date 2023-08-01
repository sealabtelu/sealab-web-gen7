import { lazy } from 'react'

const Home = lazy(() => import("../../views/Home"));
const TugasPendahuluan = lazy(() => import("../../views/SecondPage"));
const Error = lazy(() => import("../../views/Error"));

const AssistantRoutes = [
    {
        path: "/home",
        element: <Home />,
    },
    {
        path: "/tugas-pendahuluan",
        element: <TugasPendahuluan />,
    },
    {
        path: "/error",
        element: <Error />,
        meta: {
            layout: "blank",
        }
    }
]

export default AssistantRoutes
