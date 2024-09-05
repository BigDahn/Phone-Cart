import {z} from 'zod'
import axios from 'axios'

export const cartSchema = z.object({
  id: z.string(),
  title: z.string(),
  amount: z.number(),
  img: z.string(),
  price: z.number(),
})

export type Cart = z.infer<typeof cartSchema>

const url = 'https://www.course-api.com/react-useReducer-cart-project'


export const fetchCart = async():Promise<Cart[]> =>{
  const response = await axios.get<Cart[]>(url)
  console.log(response)
  const result = cartSchema.array().safeParse(response.data)
  
  if (!result.success) {
    throw new Error ("Failed to Parse")
  }
  
  return result.data
}




