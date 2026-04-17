const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');
const auth = require('../middleware/auth');

// Obtener todos los gastos
router.get('/', auth, async (req, res) => {
    try {
        const expenses = await Expense.find({ user: req.user.id }).sort({ date: -1 });
        res.json(expenses);
    } catch (err) {
        res.status(500).json({ msg: 'Error en el servidor' });
    }
});

// Crear un gasto
router.post('/', auth, async (req, res) => {
    try {
        const { description, amount, category } = req.body;
        const expense = new Expense({
            user: req.user.id,
            description,
            amount,
            category
        });
        await expense.save();
        res.json(expense);
    } catch (err) {
        res.status(500).json({ msg: 'Error en el servidor' });
    }
});

// Actualizar un gasto
router.put('/:id', auth, async (req, res) => {
    try {
        const expense = await Expense.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.json(expense);
    } catch (err) {
        res.status(500).json({ msg: 'Error en el servidor' });
    }
});

// Eliminar un gasto
router.delete('/:id', auth, async (req, res) => {
    try {
        await Expense.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Gasto eliminado' });
    } catch (err) {
        res.status(500).json({ msg: 'Error en el servidor' });
    }
});

module.exports = router;
