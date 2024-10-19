import { createValidator } from 'express-joi-validation'

export const joiValidator = createValidator({
  passError: true,
})