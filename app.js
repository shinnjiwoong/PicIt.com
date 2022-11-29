const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.sendFile('/Users/davidshinn/Desktop/web_projects/picIt_webAppVer/home.html');
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})