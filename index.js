const http = require('http')
const url = require('url')
const { PORT } = (config = require('./config'))
const StringDecoder = require('string_decoder').StringDecoder

const log = (arg) => console.log(arg)

const handlers = {} // Defining the router

handlers.sample = (data, callback) => {
  // Callback http status code and payload object
  callback(406, { name: 'sample handler' })
}

handlers.notFound = (data, callback) => {
  callback(404)
}

const router = {
  sample: handlers.sample,
} // Defining the router

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

      const chosenHandler =
        typeof router[trimmedPath] !== 'undefined'
          ? router[trimmedPath]
          : handlers.notFound

      const data = {
        trimmedPath,
        queryStringObject,
        method,
        headers,
        payload: buffer,
      } // Data Object to send upon request

      chosenHandler(data, (statusCode, payload) => {
        statusCode = typeof statusCode === 'number' ? statusCode : 200 //Use the status code called back by the handler or default to 200
        payload = typeof payload === 'object' ? payload : {} // Use the payload called back by handler of default to empty object

        const payloadString = JSON.stringify(payload) //Convert payload to string

        // Return response
        res.setHeader('Content-Type', 'application/json')
        res.writeHead(statusCode)
        res.end(payloadString)

        log({
          'requested at': trimmedPath,
          'with method': method,
          'with headers': headers,
          'with payload': buffer,
          'and query parameters': queryStringObject,
          response: {
            statusCode,
            payloadString,
          },
        })
      }) // Route the request to the handler specified on the router
    })
  })

  .listen(PORT, (err) => {
    if (!err) console.log(`Server started on port: %s`, PORT)
  })
