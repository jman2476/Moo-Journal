const express = require('express')
const db = require('./config/connection')

const app = express()
const PORT = process.env.PORT || 3469

// import routes here
// TODO: add in the routes as they are created
const api_routes = require('./routes/api_routes')


// open middleware channels
// TODO: check that all middleware channels are
//       opened that will be needed
app.use(express.json())

// Load the routes
// TODO: load the routes as they are created and
//       imported into this file
app.use('/api', api_routes)


// Confirm the DB connection
db.on('open', () => {
    // then start the server
    app.listen(PORT, () => console.log(`Engines are online on port ${PORT}`))
})