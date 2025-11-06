const express = require('express');
const router = require('./routes/userRoute');
const dotenv = require('dotenv').config();
const app = express();

app.get('/', (req, res) => {
  res.json({ msg: 'Hy there' });
});

app.use('/api/users', router);

app.listen(5000, () => {
  console.log('Listening on port 5000');
});
