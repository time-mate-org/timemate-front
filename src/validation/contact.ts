import Joi from "joi";

export const contactFormSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "Coloque seu nome.",
  }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.empty": "Um e-mail é necessário.",
    }),
  message: Joi.string().required().messages({
    "string.empty": "Diga algo.",
  }),
});
