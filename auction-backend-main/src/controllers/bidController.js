// src/controllers/bidController.js
const Auction = require('../models/Auction');
const Bid = require('../models/Bid');

async function placeBid(req, res) {
  try {
    const { auctionId } = req.params;
    const { amount } = req.body;

    // Validate input
    if (amount === undefined || typeof amount !== 'number') {
      return res.status(400).json({ message: 'Bid amount must be a number' });
    }

    // Fetch auction
    const auction = await Auction.findById(auctionId);
    if (!auction) {
      return res.status(404).json({ message: 'Auction not found' });
    }

    // Auction status check
    if (auction.status !== 'OPEN') {
      return res.status(400).json({ message: `Auction is ${auction.status}` });
    }

    // Time check
    const now = new Date();
    if (auction.endTime <= now) {
      return res.status(400).json({ message: 'Auction has already ended' });
    }

    // Price check
    const current = auction.currentPrice || auction.startingPrice;
    if (amount <= current) {
      return res
        .status(400)
        .json({ message: `Bid must be greater than current price (${current})` });
    }

    // Create bid
    const bid = await Bid.create({
      amount,
      bidder: req.user._id,    // user from auth middleware
      auction: auction._id,
    });

    // Update auction current price (safe + guaranteed)
    await Auction.findByIdAndUpdate(auctionId, {
      currentPrice: amount
    });

    return res.status(201).json({
      message: 'Bid placed successfully',
      bid
    });

  } catch (err) {
    console.error('placeBid error:', err.message);
    return res.status(500).json({ message: 'Server error placing bid' });
  }
}

async function listBidsForAuction(req, res) {
  try {
    const { auctionId } = req.params;

    const bids = await Bid.find({ auction: auctionId })
      .sort({ createdAt: -1 })
      .populate('bidder', 'username email');

    return res.json(bids);

  } catch (err) {
    console.error('listBidsForAuction error:', err.message);
    return res.status(500).json({ message: 'Server error listing bids' });
  }
}

module.exports = {
  placeBid,
  listBidsForAuction,
};
