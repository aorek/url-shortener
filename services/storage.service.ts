import fs from 'fs'
import path from 'path'
import { UrlShorted } from "../utils/common-interfaces";

const fileName = 'storage.json'
const assertsDir = path.join(__dirname, 'asserts')
const filePath = path.join(assertsDir, fileName)

export class StorageService {
  constructor() {    
    if (!fs.existsSync(filePath)) {
      fs.mkdirSync(assertsDir)
      fs.writeFileSync(filePath, '{ "links": [] }')
    }
  }

  read(link: string): UrlShorted {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
    return data.links.find((d: UrlShorted) => d.link === link)
  }

  write(newLink: UrlShorted): void {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
    data.links.push(newLink)
    const newData = JSON.stringify(data, null, 2)
    fs.writeFileSync(filePath, newData)
  }
}