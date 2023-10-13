import Joi from "@hapi/joi";

interface UserLogin {
  email: String;
  password: String;
}

export function loginValidator(data: UserLogin) {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(data);
}
