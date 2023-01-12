
const express = require('express')
const cors = require('cors')
const app = express()
const path = require('path')
const cookieParser = require('cookie-parser')
const http = require('http').createServer(app)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'public')))
} else {
    const corsOptions = {
        origin: ['http://127.0.0.1:3000', 'http://localhost:3000'],
        credentials: true
    }
    app.use(cors(corsOptions))
}

app.use(cookieParser())

app.use(express.json())


const toyRoutes = require('./api/toy/toy.routes')


app.use('/api/toy', toyRoutes)

/// list
// app.get('/api/toy', (req, res) => {
//     const filterBy = req.query
//     toyService.query(filterBy)
//         .then((toys) => {
//             res.send(toys)
//         })
//         .catch(err => {
//             console.log('Error:', err)
//             res.status(400).send('Cannot get toys')
//         })
// })


// /// update
// app.put('/api/toy', (req, res) => {
//     const toy = req.body

//     toyService.save(toy)
//         .then((savedToy) => {
//             res.send(savedToy)
//         })
//         .catch(err => {
//             console.log('Error:', err)
//             res.status(400).send('Cannot update toy')
//         })
// })

// /// create 
// app.post('/api/toy', (req, res) => {
//     const toy = req.body
//     toyService.save(toy)
//         .then((savedToy) => {
//             res.send(savedToy)
//         })
//         .catch(err => {
//             console.log('Error:', err)
//             res.status(400).send('Cannot create toy')
//         })
// })

// /// Read GetById
// app.get('/api/toy/:toyId', (req, res) => {
//     const { toyId } = req.params

//     toyService.get(toyId)
//         .then((toy) => {
//             res.send(toy)
//         })
//         .catch(err => {
//             console.log('Error:', err)
//             res.status(400).send('Cannot get car')
//         })
// })

// //Remove 
// app.delete('/api/toy/:toyId', (req, res) => {
//     const { toyId } = req.params

//     toyService.remove(toyId)
//         .then(() => {
//             res.send({ msg: 'toy removed successfully', toyId })
//         })
//         .catch(err => {
//             console.log('Error:', err)
//             res.status(400).send('Cannot delete toy')
//         })
// })


app.get('/**', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

const port = process.env.PORT || 3030;
const logger = require('./services/logger.service')
http.listen(port, () => {
    logger.info(`App listening on port ${port}!`)
})