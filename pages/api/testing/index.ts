// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {update, find} from '../../../handlers/users'

type ResponseData = {
  name: string
}

export default async function  handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
 const {id} = await find("405957e9-8753-4093-8a4b-e2e9d722fe1c")
 console.log(id)
 try {
  const query = await update({id: id},{planType: 'basic'})

 console.log(query)
 } catch (error) {
  res.status(500).json(error as ResponseData)
 }


}