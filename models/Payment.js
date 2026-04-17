const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    description: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        default: 'general'
    },
    status: {
        type: String,
        enum: ['pendiente', 'pagado', 'cancelado'],
        default: 'pendiente'
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Payment', PaymentSchema);
