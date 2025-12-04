// src/routes/bidRoutes.js
const express = require('express');
const router = express.Router();

const { placeBid, listBidsForAuction } = require('../controllers/bidController');
const authMiddleware = require('../middleware/authMiddleware');

// Public: list bids for an auction
router.get('/:auctionId', listBidsForAuction);

// Protected: place a new bid
router.post('/:auctionId', authMiddleware, placeBid);

module.exports = router;
