import Joi from "joi";

export const appointmentSchema = Joi.object({
  date: Joi.date().required().messages({
    "date.empty": "A data do agendamento não pode ser vazia.",
  }),
  clientId: Joi.number().required().messages({
    "number.base": "Selecione um cliente.",
  }),
  serviceId: Joi.number().required().messages({
    "number.base": "Selecione um serviço.",
  }),
  professionalId: Joi.number().required().messages({
    "number.base": "Selecione um profissional.",
  }),
});
