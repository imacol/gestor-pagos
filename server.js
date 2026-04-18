const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const paymentRoutes = require('./routes/payments');
const expenseRoutes = require('./routes/expenses');
const reportRoutes = require('./routes/reports');

const app = express();

app.use(bodyParser.json());

mongoose.connect('mongodb+srv://admin:Admin1234@gestor-pagos.rbbjl7w.mongodb.net/gestor-pagos', { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log('MongoDB Connected!')).catch(err => console.log(err));

app.use('/api/auth', authRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/reports', reportRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
