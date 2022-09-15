// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {update, findByCustomerId} from '../../../handlers/users'

type ResponseData = {
  name: string
}

export default async function  handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
 const {id} = await findByCustomerId("123")
 console.log(id)
 try {
  const query = await update({id: id},{subscriptionData:{
    createdDate: 2323,
    currency:'usd',
    id:'sdjlsjdas',
    interval:'day',
    intervalCount: 1,
    periodEndsAt: 2314,
    periodStartsAt: 23134,
    priceId:'sfdsad23e3',
    status:'sAS',
    trialEndsAt: 343432,
    trialStartsAt: 3123
  }})

 console.log(query)
 } catch (error) {
  res.status(500).json(error as ResponseData)
 }


}