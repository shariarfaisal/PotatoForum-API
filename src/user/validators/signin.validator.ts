import { SigninDto } from '../dto/signin.dto'

export const signinValidator = ({ username, password }: SigninDto) => {
  const errors: any = {}

  if(!username) errors.username = "Username required."
  if(!password) errors.password = "Password required."

  return { errors, isValid: Object.keys(errors).length === 0}
}
