const express = require('express');
const router = express.Router();
const Payment = require('../models/Payment');
const auth = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
    try {
        const payments = await Payment.find({ user: req.user.id }).sort({ date: -1 });
        res.json(payments);
    } catch (err) {
        res.status(500).json({ msg: 'Error en el servidor' });
    }
});

router.post('/', auth, async (req, res) => {
    try {
        const { description, amount, category, status } = req.body;
        const payment = new Payment({
            user: req.user.id,
            description,
            amount,
            category,
            status: status || 'pendiente'
        });
        await payment.save();
        res.json(payment);
    } catch (err) {
        res.status(500).json({ msg: 'Error en el servidor' });
    }
});

router.put('/:id', auth, async (req, res) => {
    try {
        const payment = await Payment.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.json(payment);
    } catch (err) {
        res.status(500).json({ msg: 'Error en el servidor' });
    }
});

router.delete('/:id', auth, async (req, res) => {
    try {
        await Payment.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Pago eliminado' });
    } catch (err) {
        res.status(500).json({ msg: 'Error en el servidor' });
    }
});

module.exports = router;
