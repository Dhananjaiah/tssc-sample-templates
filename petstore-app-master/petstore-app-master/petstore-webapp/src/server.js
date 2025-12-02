const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.post('/api/log', (req, res) => {
  console.log('Frontend error:', req.body.error);
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`Log server running on port ${PORT}`);
});