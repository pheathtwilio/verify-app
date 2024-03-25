import { z } from 'zod'
import validator from 'validator'
import { redirect } from 'next/navigation'

// const schema = z.object({
//   email: z.string().refine(validator.isEmail()),
//   telephone: z.string().refine(validator.isMobilePhone(this.telephone, 'en-US'))
// })

export default async function handler(req, res) {


  // form.parse(req, (err, fields, files) => {
  //   console.log('fields: ', fields)
  //   console.log('files: ', files)
  //   res.send({success: true})
  // })

  // const parsed = schema.safeParse(req.body())

  // redirect('/verify/otp')
  
}