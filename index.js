const http = require('http')
const url = require('url')
const StringDecoder = require('string_decoder').StringDecoder

const log = (arg) => console.log(arg)

const server = http
  .createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true) //Parsing url
    const path = parsedUrl.pathname //Getting Path
    const trimmedPath = path.replace(/^\/+|\/+$/g, '') //Removing Slashes from path

    const queryStringObject = parsedUrl.query //Get query string object from url
    const method = req.method.toLocaleLowerCase() //Http Methods
    const headers = req.headers //Getting the headers

    const decoder = new StringDecoder('utf-8') // if Payload
    let buffer = ''

    req.on('data', (data) => (buffer += decoder.write(data))) // Sends received data decoded as utf-8

    req.on('end', () => {
      buffer += decoder.end()

      res.end('NODE JS MASTERCLASS')

      log({
        'requested at': trimmedPath,
        'with method': method,
        'with headers': headers,
        'with payload': buffer,
        'and query parameters': queryStringObject,
      })
    })
  })

  .listen(3000, (err) => {
    if (!err) console.log(`Server started on port: %s`, 3000)
  })
