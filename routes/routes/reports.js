const express = require('express');
const router = express.Router();
const Payment = require('../models/Payment');
const Expense = require('../models/Expense');
const auth = require('../middleware/auth');

// Resumen general
router.get('/summary', auth, async (req, res) => {
    try {
        const payments = await Payment.find({ user: req.user.id });
        const expenses = await Expense.find({ user: req.user.id });

        const totalPagos = payments.reduce((sum, p) => sum + p.amount, 0);
        const totalGastos = expenses.reduce((sum, e) => sum + e.amount, 0);
        const balance = totalPagos - totalGastos;

        res.json({
            totalPagos,
            totalGastos,
            balance,
            cantidadPagos: payments.length,
            cantidadGastos: expenses.length
        });
    } catch (err) {
        res.status(500).json({ msg: 'Error en el servidor' });
    }
});

// Reporte por categoria
router.get('/by-category', auth, async (req, res) => {
    try {
        const expenses = await Expense.find({ user: req.user.id });
        const report = {};
        expenses.forEach(e => {
            if (!report[e.category]) report[e.category] = 0;
            report[e.category] += e.amount;
        });
        res.json(report);
    } catch (err) {
        res.status(500).json({ msg: 'Error en el servidor' });
    }
});

module.exports = router;
