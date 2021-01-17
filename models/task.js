const mongoose = require('mongoose')
const Schema = mongoose.Schema

const taskSchema = new Schema({
	isDone: {
		type: Boolean,
		required: true,
		default: false
	},
	content: {
		type: String,
		required: true
	}
})

module.exports = mongoose.model('Task', taskSchema)
