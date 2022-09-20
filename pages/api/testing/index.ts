// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {update, find,findByCustomerId} from '../../../handlers/users'


type ResponseData = {
  name: string
}

export default async function  handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {

  const customer = req.query.id as string
 
    const {id} = await findByCustomerId(customer)
    console.log('The db query ',id)


//  try {
//   const query = await update({id: user.id},{planType: 'basicAnnual'})

//  console.log(query)
//  } catch (error) {
//   res.status(500).json(error as ResponseData)
//  }

res.status(200).json({name: id})
 }