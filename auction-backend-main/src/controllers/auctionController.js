// src/controllers/auctionController.js
const Auction = require('../models/Auction');

async function createAuction(req, res) {
  try {
    const { title, description, startingPrice, endTime } = req.body;

    if (!title || !startingPrice || !endTime) {
      return res.status(400).json({
        message: 'title, startingPrice, and endTime are required',
      });
    }

    const end = new Date(endTime);
    if (isNaN(end.getTime())) {
      return res.status(400).json({ message: 'endTime must be a valid date' });
    }

    const auction = await Auction.create({
      title,
      description: description || '',
      startingPrice,
      currentPrice: startingPrice,
      seller: req.user._id, // from authMiddleware
      endTime: end,
      status: 'OPEN',
    });

    return res.status(201).json(auction);
  } catch (err) {
    console.error('createAuction error:', err.message);
    return res.status(500).json({ message: 'Server error creating auction' });
  }
}

async function listAuctions(req, res) {
  try {
    const auctions = await Auction.find().sort({ createdAt: -1 });
    return res.json(auctions);
  } catch (err) {
    console.error('listAuctions error:', err.message);
    return res.status(500).json({ message: 'Server error listing auctions' });
  }
}

// 🔹 NEW: list auctions for the logged-in user (for Dashboard)
async function listMyAuctions(req, res) {
  try {
    const auctions = await Auction.find({ seller: req.user._id }).sort({
      createdAt: -1,
    });
    return res.json(auctions);
  } catch (err) {
    console.error('listMyAuctions error:', err.message);
    return res
      .status(500)
      .json({ message: 'Server error listing your auctions' });
  }
}

async function getAuctionById(req, res) {
  try {
    const { id } = req.params;
    const auction = await Auction.findById(id).populate(
      'seller',
      'username email'
    );
    if (!auction) {
      return res.status(404).json({ message: 'Auction not found' });
    }
    return res.json(auction);
  } catch (err) {
    console.error('getAuctionById error:', err.message);
    return res.status(500).json({ message: 'Server error fetching auction' });
  }
}

async function closeAuction(req, res) {
  try {
    const { id } = req.params;

    const auction = await Auction.findById(id);
    if (!auction) {
      return res.status(404).json({ message: 'Auction not found' });
    }

    // Only seller can close their auction
    if (auction.seller.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: 'You are not the seller of this auction' });
    }

    if (auction.status !== 'OPEN') {
      return res
        .status(400)
        .json({ message: `Auction is already ${auction.status}` });
    }

    auction.status = 'CLOSED';
    await auction.save();

    return res.json({ message: 'Auction closed', auction });
  } catch (err) {
    console.error('closeAuction error:', err.message);
    return res.status(500).json({ message: 'Server error closing auction' });
  }
}

// 🔹 OPTIONAL: Delete auction (used by item.html delete button)
async function deleteAuction(req, res) {
  try {
    const { id } = req.params;

    const auction = await Auction.findById(id);
    if (!auction) {
      return res.status(404).json({ message: 'Auction not found' });
    }

    if (auction.seller.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: 'You are not the seller of this auction' });
    }

    await Auction.deleteOne({ _id: id });

    return res.json({ message: 'Auction deleted' });
  } catch (err) {
    console.error('deleteAuction error:', err.message);
    return res.status(500).json({ message: 'Server error deleting auction' });
  }
}

module.exports = {
  createAuction,
  listAuctions,
  listMyAuctions,
  getAuctionById,
  closeAuction,
  deleteAuction,
};
