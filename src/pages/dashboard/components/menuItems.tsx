import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import BuildCircleOutlinedIcon from "@mui/icons-material/BuildCircleOutlined";
import EngineeringOutlinedIcon from "@mui/icons-material/EngineeringOutlined";
import EventNoteOutlinedIcon from "@mui/icons-material/EventNoteOutlined";
import TimelineIcon from "@mui/icons-material/Timeline";
import InfoIcon from "@mui/icons-material/Info";

export const menuItems = [
  {
    text: "Home",
    icon: <InfoIcon />,
    path: "/dashboard",
  },
  {
    text: "Timeline",
    icon: <TimelineIcon />,
    path: "/dashboard/timeline",
  },
  {
    text: "Atendimentos",
    icon: <EventNoteOutlinedIcon />,
    path: "/dashboard/appointments",
  },
  {
    text: "Clientes",
    path: "/dashboard/clients",
    icon: <PersonOutlineOutlinedIcon />,
  },
  {
    text: "Profissionais",
    icon: <EngineeringOutlinedIcon />,
    path: "/dashboard/professionals",
  },
  {
    text: "Serviços",
    icon: <BuildCircleOutlinedIcon />,
    path: "/dashboard/services",
  },
];
