// Import dependencies
const express = require('express');
const app = express();
const port = 3000;

// Define routes
app.get('/', (req, res) => {
  res.send('COVID-Tracker Backend');
});

// Start the server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});