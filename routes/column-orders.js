const express = require('express')
const router = express.Router()
const ColumnOrder = require('../models/column-order')

// Getting all
router.get('/', async (req, res) => {
	try {
		const columnOrders = await ColumnOrder.find()
		res.json(columnOrders)
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
})

// Getting one
// Creating one
// Upating one
// Deleting one