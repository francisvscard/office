const env = process.env.NODE_ENV 
let dburl = ''
let dbName = ''

if (env === 'dev') {
    dburl = 'mongodb://localhost:27017'
    dbName = 'client'
}

if (env === 'production') {
    dburl = 'mongodb://localhost:27017'
    dbName = 'client'
}

module.exports = {
    dburl,
    dbName
}