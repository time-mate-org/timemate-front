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
      ({ professional: appointmentProfessional, startTime, endTime }) => {
        const isSameProfessional =
          appointmentProfessional.id === professional.id;
        const nowIsAfterAppointmentStartTime =
          currentTime >= (startTime as Date);
        const nowIsBeforeAppointmentEndTime = currentTime < (endTime as Date);

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
    ({ startTime, endTime, professional: { id } }) =>
      (startTime as Date) <= timeSlot &&
      (endTime as Date) > timeSlot &&
      professional.id === id
  );

export {
  isBusy,
  getNextTimeSlot,
  getCurrentTimeSlot,
  getTimeSlots,
  isCurrentTimeSlot,
  getCellAppointment,
};
