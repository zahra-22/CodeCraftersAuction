// src/controllers/bidController.js
const Auction = require('../models/Auction');
const Bid = require('../models/Bid');

/**
 * PLACE A BID
 */
async function placeBid(req, res) {
  try {
    const { auctionId } = req.params;
    const { amount } = req.body;

   
    if (amount === undefined || typeof amount !== "number") {
      return res.status(400).json({ message: "Bid amount must be a number" });
    }

    // Fetch auction
    const auction = await Auction.findById(auctionId);
    if (!auction) {
      return res.status(404).json({ message: "Auction not found" });
    }

    const now = new Date();

    //  AUTO CLOSE AUCTION IF EXPIRED (Fixes your bug)
    if (now >= new Date(auction.endTime)) {
      auction.status = "CLOSED";
      await auction.save();
      return res.status(400).json({ message: "Auction has already ended" });
    }

    // Status check AFTER auto-close
    if (auction.status !== "OPEN") {
      return res.status(400).json({ message: `Auction is ${auction.status}` });
    }

    // Price check
    const current = auction.currentPrice || auction.startingPrice;
    if (amount <= current) {
      return res.status(400).json({
        message: `Bid must be greater than the current price (${current})`,
      });
    }

    // Create Bid
    const bid = await Bid.create({
      amount,
      bidder: req.user._id,
      auction: auction._id,
    });

    // Update auction price
    auction.currentPrice = amount;
    await auction.save();

    return res.status(201).json({
      message: "Bid placed successfully",
      bid,
    });

  } catch (err) {
    console.error("placeBid error:", err.message);
    return res.status(500).json({ message: "Server error placing bid" });
  }
}

/**
 * LIST BIDS FOR AUCTION
 */
async function listBidsForAuction(req, res) {
  try {
    const { auctionId } = req.params;

    const bids = await Bid.find({ auction: auctionId })
      .sort({ createdAt: -1 })
      .populate("bidder", "username email");

    return res.json(bids);

  } catch (err) {
    console.error("listBidsForAuction error:", err.message);
    return res.status(500).json({ message: "Server error listing bids" });
  }
}

module.exports = {
  placeBid,
  listBidsForAuction,
};
