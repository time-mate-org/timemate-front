import { setHours, setMinutes } from "date-fns";
import {
  TimelineRowType,
} from "../../../components/types/AppointmentTimeline";
import ContentCutIcon from "@mui/icons-material/ContentCut";

const busyIcon = <ContentCutIcon />;

export const mockedTimelineItems: TimelineRowType[] = [
  {
    professionalName: "gustavo",
    items: [
      {
        time: setHours(setMinutes(new Date(), 0), 13),
        title: "Cabelo",
        icon: busyIcon,
        duration: 15,
      },
      {
        time: setHours(setMinutes(new Date(), 15), 14),
        title: "Barba",
        icon: busyIcon,
        duration: 45,
      },
      {
        time: setHours(setMinutes(new Date(), 45), 10),
        title: "Bigode",
        icon: busyIcon,
        duration: 30,
      },
      {
        time: setHours(setMinutes(new Date(), 45), 14),
        title: "Bigode",
        icon: busyIcon,
        duration: 15,
      },
    ],
  },
  {
    professionalName: "adriano",
    items: [],
  },
  {
    professionalName: "thais",
    items: [
      {
        time: setHours(setMinutes(new Date(), 15), 20),
        title: "Bigode",
        icon: busyIcon,
        duration: 60,
      },
    ],
  },
];
