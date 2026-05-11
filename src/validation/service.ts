import Joi from "joi";

export const serviceSchema = Joi.object({
  name: Joi.string().min(3).max(100).required().messages({
    "string.empty": "O nome é obrigatório.",
    "string.min": "O nome deve ter no mínimo 3 caracteres.",
    "string.max": "O nome deve ter no máximo 100 caracteres.",
  }),
  estimated_time: Joi.number().min(10).max(600).required().messages({
    "number.empty": "O tempo estimado do serviço é obrigatório.",
    "number.min": "O serviço deve ter pelo menos 10 minutos.",
    "number.max": "O serviço não pode ter mais de 10 horas.",
  }),
  price: Joi.number().min(0.1).required().messages({
    "number.empty": "O serviço precisa ter um preço.",
    "number.min": "O serviço deve custar ao menos 10 centavos.",
  }),
  description: Joi.string().min(10).required().messages({
    string: "O serviço precisa ter uma descrição maior que 10 caracteres.",
  }),
  image: Joi.string()
    .regex(
      /^(?:https?:\/\/)?(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(?::\d+)?(?:\/[^\s]*)?$/,
    )
    .required()
    .messages({
      "string.empty": "O serviço precisa ter uma imagem.",
      "string.regex": "O serviço precisa ser uma url(ex: https://car.ai)",
    }),
});
