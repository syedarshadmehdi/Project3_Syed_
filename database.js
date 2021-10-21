const pgp = require('pg-promise')()
const cn = 'postgres://user:123456@localhost:3000/project3c'

const db = pgp(connectionString)

module.exports = db;
