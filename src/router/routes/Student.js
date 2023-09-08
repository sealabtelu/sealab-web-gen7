import { lazy } from 'react'
import {  Book, Clipboard, BookOpen, FileText } from "react-feather"

const TugasPendahuluan = lazy(() => import("../../views/pages/praktikan/TugasPendahuluan"))
const TesAwal = lazy(() => import("../../views/pages/praktikan/TesAwal"))
const Jurnal = lazy (() => import("../../views/pages/praktikan/Jurnal"))
const Error = lazy(() => import("../../views/Error"))

const StudentRoutes = [
    {
        path: "/student/tugas-pendahuluan",
        element: <TugasPendahuluan />
    },
    {
        path: "/student/tes-awal",
        element: <TesAwal />
    },
    {
        path: "/student/jurnal",
        element: <Jurnal />
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
        id: "tugasPendahuluan",
        title: "Tugas Pendahuluan",
        icon: <BookOpen size={20} />,
        navLink: "/student/tugas-pendahuluan"
    },
    {
        id: "tesAwal",
        title: "Tes Awal",
        icon: <Clipboard size={20} />,
        navLink: "student/tes-awal"
    },
    {
        id: "jurnal",
        title: "Jurnal",
        icon: <FileText size={20} />,
        navLink: "student/jurnal"
    },
    {
        id: "modulPraktikum",
        title: "Modul Praktikum",
        icon: <Book size={20} />,
        navLink: "https://drive.google.com/file/d/1ZbEN7-_Bd2Zv0Slb-aHuOabnwMjCgZ2w/view?usp=drive_link",
        target :"blank",
        rel:"noopener noreferrer"
    },
]

export default StudentRoutes.map(item => ({
    ...item,
    meta: {
        role: 'Student'
    }
}))
