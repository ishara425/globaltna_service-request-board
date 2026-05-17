const express = require('express');
const cors = require('cors');
const jobRoutes = require('./routes/jobs');

const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());

app.use('/api/jobs', jobRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong', error: err.message });
});

module.exports = app;