import Joi from "joi";
import { ResponseError } from "../error/response-error";

const validate = (schema: Joi.ObjectSchema<any>, request: any) => {
  const result = schema.validate(request, {
    abortEarly: false, // untuk memvalidasi semuanya
    allowUnknown: false, // untuk tidak menyetujui adanya body yang diluar validasi
  });
  if (result.error) {
    throw new ResponseError(400, result.error.message);
  } else {
    return result.value;
  }
};

export { validate };
