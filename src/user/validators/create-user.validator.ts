import * as validator from 'validator'
import { CreateUserDto } from '../dto/create-user.dto'

export const createUserValidator = ({ name, username, email, contact, password }: CreateUserDto) => {
  const errors: any = {}

  if(!name) errors.name = "Name required."
  else if(name.length < 2) errors.name = "Name should be atleast 2 characters."
  else if(name.length > 55) errors.name = "Too long characters."

  if(!username) errors.username = "Username required."
  else if(username.length < 2) errors.username = "Username should be atleast 2 characters."
  else if(username.length > 55) errors.username = "Too long characters."

  if(!email) errors.email = "Email required."
  else if(!validator.isEmail(email)) errors.email = "Invalid email."

  if(contact && contact.length > 20){
    errors.contact = "Too long contact characters, it seems like invalid."
  }

  if(!password) errors.password = "Password required."
  else if(password.length < 8) errors.password = "Password mush be atleast 8 characters."
  else if(!password.match(/^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{8,})/)) errors.password = "Password too week. It should contain atleast 1 uppercase and 1 lowercase character."

  return { errors, isValid: Object.keys(errors).length === 0}

}
