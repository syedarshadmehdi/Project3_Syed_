const pgp = require('pg-promise')()
const cn = 'postgres://postgres:123456@localhost:5432/project3c'

const db = pgp(cn)

module.exports = db;
