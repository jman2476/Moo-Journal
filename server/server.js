const express = require('express')
require('dotenv').config()
const db = require('./config/connection')
const path = require('path')

const { ApolloServer } = require('@apollo/server')
const { expressMiddleware } = require('@apollo/server/express4')
const cookieParser = require('cookie-parser')
const { typeDefs, resolvers } = require('./schema/')


const app = express()
const PORT = process.env.PORT || 3469 //bruh why 3469? why not


// create function to start the server
async function startServer() {
    const server = new ApolloServer({
        typeDefs,
        resolvers
    })
    
    await server.start()
    
    // Middleware channels
    app.use(express.json())
    app.use(cookieParser())
    // Apollo graphql middleware
    app.use('/graphql', expressMiddleware(server, {
        context(data) {
            return {
                req: data.req,
                res: data.res
            }
        }
    }))
    
    if (process.env.NODE_ENV === 'production') {
        app.use(express.static('../client/dist'))
        
        // when there's a request to any route besides /graphql
        app.get('*', (req, res) => {
            // then return the appropriate page based on the /dist folder
            res.sendFile(path.join(__dirname, '../client/dist/index.html'))
        })
    }
    
    // confirm the database connection
    db.on('open', () => {
        // then start the server
        app.listen(PORT, () => console.log(`Engines are online on port ${PORT}`))
    })
    
}

// start da server
startServer()