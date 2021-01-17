const express = require('express')
const router = express.Router()
const Column = require('../models/column')

//Getting all
router.get('/', async (req, res) => {
	try {
		const columns = await Column.find()
		res.json(columns)
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
})

//Get one
router.get('/:id', getColumn, (req, res) => {
	res.json(res.column)
})

//Creating one
router.post('/', async (req, res) => {
	const column = new Column({
		title: req.body.title,
		taskList: req.body.taskList
	})
	try {
		const newColumn = await column.save()
		res.status(201).json(newColumn)
	} catch (err) {
		res.status(400).json({ message: err.message })
	}
})

//Upadating one
router.patch('/:id', getColumn, async (req, res) => {
	if (req.body.title != null) {
		res.column.title = req.body.title;
	}
	if (req.body.taskList != null) {
		res.column.taskList = req.body.taskList
	}
	try {
		const updatedColumn = await res.column.save()
		res.json(updatedColumn)
	} catch (err) {
		res.status(400).json({ message: err.message })
	}
})

//Deleting one
router.delete('/:id', getColumn, async (req, res) => {
	try {
		await res.column.remove()
		res.json({ message: 'deleted column' })
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
})

async function getColumn(req, res, next){
	let column
	try {
		column = await Column.findById(req.params.id)
		if(column == null){
			return res.status(404).json({ message: 'Cannot find column' })
		}
	} catch (err) {
		return res.status(500).json({ message: err.message })
	}
	res.column = column
	next()
}

module.exports = router