const mongoose = require('mongoose')
const Schema = mongoose.Schema
const taskSchema = require('./task').schema

const columnSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	taskList: [taskSchema]
})

module.exports = mongoose.model('Column', columnSchema)
