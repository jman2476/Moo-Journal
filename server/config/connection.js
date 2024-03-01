const mongoose = require('mongoose')

mongoose.connect(process.env.DB_URL || 'mongodb://127.0.0.1:27017/moo_journal_db')

module.exports = mongoose.connection