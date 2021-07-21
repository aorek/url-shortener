import { NextApiResponse } from "next";

export function chechHttpMethod(reqMethod: string | undefined, res: NextApiResponse<any>, ...methods: string[]): boolean {
  if (reqMethod && !methods.includes(reqMethod)) {
    res.setHeader('Allow', methods)
    res.status(405).end(`Method ${reqMethod} Not Allowed`)

    return false
  }

  return true
}

export function validateUrl(url: string): boolean {
  const pattern = `((([A-Za-z]{3,9}:(?:\\/\\/)?)(?:[-;:&=\\+\\$,\\w]+@)?[A-Za-z0-9.-]+(:[0-9]+)?|(?:www.|[-;:&=\\+\\$,\\w]+@)[A-Za-z0-9.-]+)((?:\\/[\\+~%\\/.\\w\\-_]*)?\\??(?:[-\\+=&;%@.\\w_]*)#?(?:[\\w]*))?)`
  const regex = new RegExp(pattern, 'i')
  return regex.test(url)
}