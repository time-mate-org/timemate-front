import Joi from "joi";

export const appointmentSchema = Joi.object({
  date: Joi.date().required().messages({
    "date.empty": "A data do agendamento não pode ser vazia.",
  }),
  client_id: Joi.number().required().messages({
    "number.base": "Selecione um cliente.",
  }),
  service_id: Joi.number().required().messages({
    "number.base": "Selecione um serviço.",
  }),
  professional_id: Joi.number().required().messages({
    "number.base": "Selecione um profissional.",
  }),
});
