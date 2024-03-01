const { sign, verify } = require('jsonwebtoken')

function genToken(user_id) {
    const token = sign({user_id}, process.env.JWT_SECRET)

    return token
}

// decodes the token and returns it
function verToken(token) {
    try {
        const {user_id} = verify(token, process.env.JWT_SECRET)

        return user_id
    } catch (err) {
        throw new GraphQLError('Your milk token has spoiled')
    }
}

function proteck(resolver) {
    return async function (_, args, {req, resolver}) {
        const token = req.cookies.token // grabs the token from the cookie jar

        if (!token) {
            throw new GraphQLError("I'm sorry Dave, I cannot let you do that.")
        }

        try {
            const user_id = verToken(token)

            return resolver(_,args, {req, res, user_id})
        } catch (err) {
            throw new GraphQLError('Your token is invalid')
        }
    }
}

module.exports = { genToken, verToken, proteck }