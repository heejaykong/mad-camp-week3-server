const express = require('express')
const router = express.Router()
const Task = require('../models/task')

// Getting all
router.get('/', async (req, res) => {
	try {
		const tasks = await Task.find()
		res.json(tasks)
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
})

// Getting one
router.get('/:id', getTask, (req, res) => {
	res.json(res.task)
})

// Creating one
router.post('/', async (req, res) => {
	const task = new Task({
		isDone: req.body.isDone,
		content: req.body.content
	})
	try {
		const newTask = await task.save()
		res.status(201).json(newTask)
	} catch (err) {
		res.status(400).json({ message: err.message })
	}
})

// Updating one
router.patch('/:id', getTask, async (req, res) => { //put 대신 patch
	if(req.body.isDone != null){
		res.task.isDone = req.body.isDone
	}
	if(req.body.content != null){
		res.task.content = req.body.content
	}
	try {
		const updatedTask = await res.task.save()
		res.json(updatedTask)
	} catch (err) {
		res.status(400).json({ message: err.message })
	}
})

// Deleting one
router.delete('/:id', getTask, async (req, res) => {
	try {
		await res.task.remove()
		res.json({ message: 'deleted task' })
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
})

async function getTask(req, res, next) {
	let task
	try {
		task = await Task.findById(req.params.id)
		if (task == null) {
			return res.status(404).json({ message: 'Cannot find task' })
		}
	} catch (err) {
		return res.status(500).json({ message: err.message })
	}
	res.task = task
	next()
}

module.exports = router
