/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express')
const { createProxyMiddleware } = require('http-proxy-middleware')

const app = express()

app.use(express.static('./dist'))

app.use('/boss', createProxyMiddleware({
  target: 'http://eduboss.lagounews.com',
  changeOrigin: true
}))

app.use('/front', createProxyMiddleware({
  target: 'http://edufront.lagounews.com',
  changeOrigin: true
}))

app.listen(3000, () => {
  console.log('server run on 3000 port')
})
