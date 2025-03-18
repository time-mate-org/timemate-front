import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import BuildCircleOutlinedIcon from "@mui/icons-material/BuildCircleOutlined";
import EngineeringOutlinedIcon from "@mui/icons-material/EngineeringOutlined";
import EventNoteOutlinedIcon from "@mui/icons-material/EventNoteOutlined";

export const menuItems = [
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
  {
    text: "Atendimentos",
    icon: <EventNoteOutlinedIcon />,
    path: "/dashboard/appointments",
  },
];
