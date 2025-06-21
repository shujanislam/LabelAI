const express = require('express');

const cors = require('cors');

const app = express();

const uploadDataRoute = require('./routes/uploadData.route.js');

app.use(cors({
  origin: "http://localhost:3000", // replace with your frontend URL
  credentials: true,               // if using cookies/auth sessions
}));

app.use('/api/v1', uploadDataRoute);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on Port: http://localhost:${PORT}`);
})
