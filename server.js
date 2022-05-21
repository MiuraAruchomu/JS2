const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const fs = require('fs')

const app = express()

app.use(bodyParser.json({ extended: true }))
app.use(cors())
app.use(express.static('.'))

app.listen(3000, () => {
    console.log('Server is running at port 3000')
})

app.get('/catalogData', (req, res) => {
    fs.readFile('catalogData.json', 'utf-8', (err, data) => {
        if (err) {
            res.send('{"result": 0}')
        } else {
            res.send(data)
        }
    })
})

app.get('/cartData', (req, res) => {
    fs.readFile('cartData.json', 'utf-8', (err, data) => {
        if (err) {
            res.send('{"result": 0}')
        } else {
            res.send(data)
        }
    })
})

app.post('/addToCart', (req, res) => {
    fs.readFile('cartData.json', 'utf-8', (err, data) => {
        if (err) {
            res.send('{"result": 0}')
        } else {
            const cart = JSON.parse(data)
            const item = req.body

            item.id = Math.random()
            cart.push(item)

            fs.writeFile('cartData.json', JSON.stringify(cart), (err) => {
                if (err) {
                    res.send('{"result": 0}')
                } else {
                    res.send(data)
                }
            })
        }
    })
})

app.post('/removeFromCart', (req, res) => {
    fs.readFile('cartData.json', 'utf-8', (err, data) => {
        if (err) {
            res.send('{"result": 0}')
        } else {
            const cart = JSON.parse(data)
            const item = req.body

            let id = item["id"]
            let index = cart.map(el => el.id).indexOf(id)
            if (index !== -1) {
                cart.splice(index, 1)
            }

            fs.writeFile('cartData.json', JSON.stringify(cart), (err) => {
                if (err) {
                    res.send('{"result": 0}')
                } else {
                    res.send(data)
                }
            })
        }
    })
})