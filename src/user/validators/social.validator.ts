import { SocialDTO } from '../dto/social.dto'

export const socialValidator = ({ facebook, twitter, linkedin, github, web }: SocialDTO) => {
  const errors: any = {}

  if(facebook && typeof facebook !== 'string') errors.facebook = "Facebook url must be a string"
  if(twitter && typeof twitter !== 'string') errors.twitter = "Twitter url must be a string"
  if(linkedin && typeof linkedin !== 'string') errors.linkedin = "Linkedin url must be a string"
  if(github && typeof github !== 'string') errors.github = "Github url must be a string"
  if(web && typeof web !== 'string') errors.web = "Web url must be a string"

  return { errors, isValid: Object.keys(errors).length === 0}
}
