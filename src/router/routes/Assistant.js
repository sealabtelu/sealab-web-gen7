import { lazy } from 'react'

const Home = lazy(() => import("../../views/Home"));
const SecondPage = lazy(() => import("../../views/SecondPage"));
const Error = lazy(() => import("../../views/Error"));

const AssistantRoutes = [
    {
        path: "/home",
        element: <Home />,
    },
    {
        path: "/second-page",
        element: <SecondPage />,
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
