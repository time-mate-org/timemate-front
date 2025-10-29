import Joi from "joi";

export const pdfReportSchema = Joi.object({
  start_date: Joi.date().iso().required().messages({
    "start_date.empty": "O horário de início do relatório não pode ser vazio.",
  }),
  professional_id: Joi.number().required().messages({
    "number.base": "Selecione um profissional.",
  }),
  end_date: Joi.date().iso().required().messages({
    "end_date.empty": "O horário final do relatório não pode ser vazio.",
  }),
});
