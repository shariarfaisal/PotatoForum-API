import * as validator from 'validator'
import { UpdateUserDto } from '../dto/update-user.dto'

export const updateUserValidator = ({ name, username, email, contact, work, address }: UpdateUserDto) => {
  const errors: any = {}

  if(!name) errors.name = "Name required."
  else if(name.length > 2) errors.name = "Name should be atleast 2 characters."
  else if(name.length > 55) errors.name = "Too long characters."

  if(!username) errors.username = "Username required."
  else if(username.length > 2) errors.username = "Username should be atleast 2 characters."
  else if(username.length > 55) errors.username = "Too long characters."

  if(!email) errors.email = "Email required."
  else if(!validator.isEmail(email)) errors.email = "Invalid email."

  if(contact && contact.length > 20){
    errors.contact = "Too long contact characters, it seems like invalid."
  }

  if(work && work.length > 55){
    errors.work = "55 characters limited."
  }

  if(address && address.length > 55){
    errors.address = "55 characters limited."
  }


  return { errors, isValid: Object.keys(errors).length === 0}

}
