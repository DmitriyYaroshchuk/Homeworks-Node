require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require('./config/db');
const useRoutes = require('./routes/routes');

app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/goods', useRoutes);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})