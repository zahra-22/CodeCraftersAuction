const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const auctionRoutes = require('./routes/auctionRoutes');
const bidRoutes = require('./routes/bidRoutes');


dotenv.config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// connect to MongoDB database 
connectDB();

// simple test route
app.get('/', (req, res) => {
  res.json({ message: 'Auction API is running' });
});

// 👉 auth routes
app.use('/api/auth', authRoutes);
// 👉 auction routes
app.use('/api/auctions', auctionRoutes);
const PORT = process.env.PORT || 4000;
// 👉 bid routes
app.use('/api/bids', bidRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
