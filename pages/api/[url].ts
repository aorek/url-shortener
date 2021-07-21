// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { StorageService } from '../../services/storage.service'
import { HttpMethod } from '../../utils/common-interfaces'
import { chechHttpMethod } from '../../utils/commons'

type Data = {
  url: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | string>
) {
  const {
    method,
    query: { url }
  } = req

  if (!chechHttpMethod(method, res, HttpMethod.GET)) {
    return
  }

  // Call service to retrieve main url from incoming
  const storage = new StorageService()
  const mainUrl = storage.read(url as string)

  if (!mainUrl) {
    res.status(404).send('Not found')
    return
  }

  res.status(200).json({
    url: mainUrl.url
  })
}
