const express = require('express');
const router = express.Router();
const Payment = require('../models/Payment');
const Expense = require('../models/Expense');
const auth = require('../middleware/auth');

router.get('/summary', auth, async (req, res) => {
    try {
        const payments = await Payment.find({ user: req.user.id });
        const expenses = await Expense.find({ user: req.user.id });
        const totalPagos = payments.reduce((sum, p) => sum + p.amount, 0);
        const totalGastos = expenses.reduce((sum, e) => sum + e.amount, 0);
        res.json({
            totalPagos,
            totalGastos,
            balance: totalPagos - totalGastos
        });
    } catch (err) {
        res.status(500).json({ msg: 'Error en el servidor' });
    }
});

module.exports = router;
