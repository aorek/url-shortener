export class UrlGeneratorService {
  static urlGenerator() {
    return 'xxxxxxxx'.replace(/x/g, () => Math.floor(Math.random() * 16).toString(16))
  }
}