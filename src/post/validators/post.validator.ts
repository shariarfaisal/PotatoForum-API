import { PostDto } from '../dto/post.dto'

export const postValidator = ({ title, body, tags }: PostDto) => {
  const errors: any = {}

  if(!title) errors.title = "Title required."
  else if(title.length > 100) errors.title = "100 characters limited"

  if(!body) errors.body = "Body required."
  else if(body.length > 5000) errors.body = "5000 characters limited."

  if(!tags) errors.tags = "Tags required."
  else if(tags.length > 500) errors.tags = "500 characters limited."

  return { errors, isValid: Object.keys(errors).length === 0}
}
