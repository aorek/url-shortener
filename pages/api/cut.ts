// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { StorageService } from '../../services/storage.service';
import { UrlGeneratorService } from '../../services/url-generator.service';
import { HttpMethod } from '../../utils/common-interfaces';
import { chechHttpMethod, validateUrl } from '../../utils/commons';

type Error = {
  statusCode: number,
  message: string
}

type Data = {
  url?: string,
  error?: Error
}

type CutUrlResult = {
  url?: string,
  error?: Error
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { body, method } = req  

  if (!chechHttpMethod(method, res, HttpMethod.POST)) {
    return
  }

  const result = cutUrl(body.url)

  if (result.error) {
    res.status(400).json({
      error: result.error
    })
    return
  }

  res.status(200).json({ url: result.url })
}

function cutUrl(url: string): CutUrlResult {
  const result: CutUrlResult = {}
  // Validate input url
  if (!validateUrl(url)) {
    result.error = {
      statusCode: 400,
      message: 'url is no valid'
    }
    return result
  }
  
  // Call service to generate new url and map them
  const newUrl = UrlGeneratorService.urlGenerator()

  // Save to json file
  const storage = new StorageService()
  const urlShorted = { link: newUrl, url}
  storage.write(urlShorted)

  result.url = `${process.env.HOST}/api/${newUrl}`

  // Return the shortened url
  return result
}


