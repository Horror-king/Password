const express = require("express");
const axios = require("axios");

const app = express();
const port = process.env.PORT || 5000;

const apiNinjasKey = "Ot28mMZlv6k4ttzYvKAA0Q==gsjSjZUAsL2qGe3O"; // Replace with your API Ninjas key

app.get('/carinfo', async (req, res) => {
  const model = req.query.model || '';

  if (!model) {
    return res.status(400).json({ error: 'Model parameter is required' });
  }

  try {
    const response = await axios.get(`https://api.api-ninjas.com/v1/cars?model=${model}`, {
      headers: { 'X-Api-Key': apiNinjasKey }
    });
    
    if (response.data.length === 0) {
      return res.status(404).json({ error: 'No cars found for the given model' });
    }

    return res.json(response.data);
  } catch (err) {
    const errorMessage = err.response?.data?.error || err.message || 'Unknown error';
    return res.status(500).json({
      error: 'An error occurred: ' + errorMessage
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
