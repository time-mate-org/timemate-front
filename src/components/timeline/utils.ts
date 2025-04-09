import { clone, isEmpty } from "ramda";
import {
  addHours,
  addMinutes,
  closestTo,
  getHours,
  getMinutes,
  isSameDay,
  isSameHour,
  isSameMinute,
  isSameMonth,
  setHours,
  setMinutes,
} from "date-fns";
import { Appointment, Professional } from "../../types/models";
import { toUTCDate } from "../../utils/date";

const isCurrentTimeSlot = (timeSlot: Date, currentTimeSlot: Date) =>
  isSameMinute(timeSlot, currentTimeSlot as Date) &&
  isSameHour(timeSlot, currentTimeSlot as Date) &&
  isSameDay(timeSlot, currentTimeSlot as Date) &&
  isSameMonth(timeSlot, currentTimeSlot as Date);

const getTimeSlots = (): Date[] => {
  const timeSlots: Date[] = [];
  let currentTime = setHours(setMinutes(new Date(), 0), 8);
  while (getHours(currentTime) < 18) {
    timeSlots.push(currentTime);
    currentTime = addMinutes(currentTime, 15);
  }
  return timeSlots;
};

// Função para calcular o índice do bloco de 15 minutos com base no tempo atual
const getCurrentTimeSlot = (date: Date) => {
  const dates: Date[] = [0, 15, 30, 45]
    .map((minute) => setMinutes(clone(date), minute))
    .filter((optionDate) => optionDate <= date);
  return closestTo(date, dates) as Date;
};
// Função para calcular o índice do bloco de 15 minutos com base no tempo atual
const getNextTimeSlot = (date: Date) => {
  const dates: Date[] = [0, 15, 30, 45]
    .map((minute) => setMinutes(new Date(date), minute))
    .filter((optionDate) => optionDate > date);

  const isLastQuarterOfHour = getMinutes(date) >= 45;

  return isLastQuarterOfHour
    ? addHours(setMinutes(new Date(date), 0), 1)
    : (closestTo(date, dates) as Date);
};

const isBusy = ({
  professional,
  currentTime,
  appointments,
}: {
  professional: Professional;
  currentTime: Date;
  appointments: Appointment[];
}): boolean =>
  !isEmpty(
    appointments.filter(
      ({ professional: appointmentProfessional, start_time, end_time }) => {
        const isSameProfessional =
          appointmentProfessional.id === professional.id;
        const nowIsAfterAppointmentStartTime =
          currentTime >= (toUTCDate(start_time) as Date);
        const nowIsBeforeAppointmentEndTime =
          currentTime < (toUTCDate(end_time) as Date);

        return (
          isSameProfessional &&
          nowIsAfterAppointmentStartTime &&
          nowIsBeforeAppointmentEndTime
        );
      }
    )
  );

const getCellAppointment = (
  professional: Professional,
  timeSlot: Date,
  appointments: Appointment[]
): Appointment | undefined =>
  appointments.find(
    ({ start_time, end_time, professional: { id } }) =>
      (toUTCDate(start_time) as Date) <= timeSlot &&
      (toUTCDate(end_time) as Date) > timeSlot &&
      professional.id === id
  );

const invertColor = (hexColor: string) => {
  const color = hexColor.replace("#", "");
  const colorNum = parseInt(color, 16);
  const invertedNum = 0xffffff - colorNum;
  const invertedHex = "#" + invertedNum.toString(16).padStart(6, "0");
  return invertedHex;
};

const simplifyName = (name: string) =>
  name.length > 10 ? `${name.substring(0, 7)}...` : name;

export {
  isBusy,
  getNextTimeSlot,
  getCurrentTimeSlot,
  getTimeSlots,
  isCurrentTimeSlot,
  getCellAppointment,
  invertColor,
  simplifyName,
};
