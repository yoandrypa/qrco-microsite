// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {update, find,findByCustomerId} from '../../../handlers/users'


type ResponseData = {

}

export default async function  handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
 if (req.method == 'POST'){
  const customer = req.body.customer as string 
  const {id} = await findByCustomerId(customer)
  return res.status(200).json({id})  
 } else {
  return res.status(400)
 }
  

//  try {
//   const query = await update({id: user.id},{planType: 'basicAnnual'})

//  console.log(query)
//  } catch (error) {
//   res.status(500).json(error as ResponseData)
//  }


 }