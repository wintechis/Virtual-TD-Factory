const express = require('express')
const app = express()
const port = 3001

app.use(express.static('DrDrDemo2'))

app.get('/', (req, res) => {
    res.send('Drag Drop test!')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})