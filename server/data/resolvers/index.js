const authResolver = require('./authentication')
const notesResolver = require('./notes')

const rootResolver = {
    ...notesResolver,
    ...authResolver
}

module.exports = {rootResolver}