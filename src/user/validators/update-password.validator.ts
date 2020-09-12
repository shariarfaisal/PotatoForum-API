import { UpdatePasswordDto } from '../dto/update-password.dto'

export const updatePasswordValidator = ({ oldPassword, newPassword}: UpdatePasswordDto) => {
  const errors: any = {}

  if(!oldPassword) errors.oldPassword = "Old password required"

  if(!newPassword) errors.newPassword = "New password required."
  else if(newPassword.length < 8) errors.newPassword = "Password mush be atleast 8 characters."
  else if(!newPassword.match(/^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{8,})/)) errors.newPassword = "New Password too week. It should contain atleast 1 uppercase and 1 lowercase character."

  return { errors, isValid: Object.keys(errors).length === 0}
}
