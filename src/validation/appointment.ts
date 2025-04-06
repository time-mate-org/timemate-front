import Joi from "joi";

export const appointmentSchema = Joi.object({
  id: Joi.number(),
  start_time: Joi.date().iso().required().messages({
    "start_time.empty": "O horário do agendamento não pode ser vazio.",
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
