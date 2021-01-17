const mongoose = require('mongoose')
const Schema = mongoose.Schema
const columnSchema = require('./column').schema

const columnOrderSchema = new Schema({
    columnOrder: [columnSchema]
})

module.exports = mongoose.model('ColumnOrder', columnOrderSchema)