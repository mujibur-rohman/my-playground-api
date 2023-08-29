import Joi from "joi";

const changeProfileValidation = Joi.object({
  photo: Joi.string().required(),
  bio: Joi.string().max(255).required(),
});
