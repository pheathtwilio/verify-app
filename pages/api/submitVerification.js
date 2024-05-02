import { sendToken } from '../../services/verifyService'

export default async function handler(req, res) {


  let verification = await sendToken(req.body)
  return res.status(200).json({message: 'success'})

  
}