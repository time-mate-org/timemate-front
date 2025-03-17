import Joi from "joi";

export const professionalSchema = Joi.object({
  name: Joi.string().min(3).max(100).required().messages({
    "string.empty": "O nome é obrigatório.",
    "string.min": "O nome deve ter no mínimo 3 caracteres.",
    "string.max": "O nome deve ter no máximo 100 caracteres.",
  }),
  title: Joi.string().min(5).max(200).required().messages({
    "string.empty": "O título do profissional(ex: barbeiro) é obrigatório.",
    "string.min": "O título do profissional deve ter no mínimo 5 caracteres.",
    "string.max": "O título do profissional deve ter no máximo 200 caracteres.",
  }),
  phone: Joi.string()
    .pattern(/^\([1-9]{2}\) [9]{0,1}[0-9]{4}-[0-9]{4}$/)
    .required()
    .messages({
      "string.empty": "O telefone é obrigatório.",
      "string.pattern.base": "Formato inválido (ex: (11) 98765-4321).",
    }),
});
