import { Mail, Home } from "react-feather";

export default [
  {
    id: "home",
    title: "Home",
    icon: <Home size={20} />,
    navLink: "/home",
  },
  {
    id: "tugasPendahuluan",
    title: "Tugas Pendahuluan",
    icon: <Mail size={20} />,
    navLink: "/tugas-pendahuluan",
  },
  {
    id: "tugasAwal",
    title: "Tes Awal",
    icon: <Mail size={20} />,
    navLink: "/tes-awal",
  },
];
