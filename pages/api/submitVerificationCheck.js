import { checkVerification } from '../../services/verifyService'

export default async function handler(req, res) {


  let verificationCheck = await checkVerification(req.body)

  return res.status(200).json({message: verificationCheck})

  
}