const Auction = require("../models/Auction.js");

// =======================
// CREATE AUCTION
// =======================
async function createAuction(req, res) {
  try {
    const { title, description, startingPrice, endTime } = req.body;

    if (!title || !startingPrice || !endTime) {
      return res.status(400).json({
        message: "title, startingPrice, and endTime are required",
      });
    }

    const end = new Date(endTime);

    if (isNaN(end.getTime())) {
      return res.status(400).json({ message: "endTime must be a valid date" });
    }

    if (end <= new Date()) {
      return res.status(400).json({
        message: "endTime must be in the future.",
      });
    }

    const auction = await Auction.create({
      title,
      description: description || "",
      startingPrice,
      currentPrice: startingPrice,
      seller: req.user._id,
      endTime: end,
      status: "OPEN",
    });

    return res.status(201).json(auction);
  } catch (err) {
    console.error("createAuction error:", err);
    res.status(500).json({ message: "Server error creating auction" });
  }
}

// =======================
// LIST ALL AUCTIONS
// =======================
async function listAuctions(req, res) {
  try {
    const auctions = await Auction.find()
      .populate("seller", "name email");

    res.json(auctions);
  } catch (err) {
    console.error("listAuctions error:", err);
    res.status(500).json({ message: "Server error listing auctions" });
  }
}

// =======================
// LIST LOGGED-IN USER’S AUCTIONS
// =======================
async function listMyAuctions(req, res) {
  try {
    const auctions = await Auction.find({ seller: req.user._id })
      .populate("seller", "name email");

    res.json(auctions);
  } catch (err) {
    console.error("listMyAuctions error:", err);
    res.status(500).json({ message: "Server error" });
  }
}

// =======================
// GET AUCTION BY ID
// =======================
async function getAuctionById(req, res) {
  try {
    const auction = await Auction.findById(req.params.id)
      .populate("seller", "name email");

    if (!auction) {
      return res.status(404).json({ message: "Auction not found" });
    }

    res.json(auction);
  } catch (err) {
    console.error("getAuctionById error:", err);
    res.status(500).json({ message: "Server error" });
  }
}

// =======================
// UPDATE AUCTION
// =======================
async function updateAuction(req, res) {
  try {
    const updates = req.body;

    const auction = await Auction.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true }
    ).populate("seller", "name email");

    if (!auction) {
      return res.status(404).json({ message: "Auction not found" });
    }

    res.json(auction);
  } catch (err) {
    console.error("updateAuction error:", err);
    res.status(500).json({ message: "Server error updating auction" });
  }
}

// =======================
// CLOSE AUCTION
// =======================
async function closeAuction(req, res) {
  try {
    const auction = await Auction.findById(req.params.id)
      .populate("seller", "name email");

    if (!auction) {
      return res.status(404).json({ message: "Auction not found" });
    }

    auction.status = "CLOSED";
    await auction.save();

    res.json({ message: "Auction closed", auction });
  } catch (err) {
    console.error("closeAuction error:", err);
    res.status(500).json({ message: "Server error closing auction" });
  }
}

// =======================
// DELETE AUCTION
// =======================
async function deleteAuction(req, res) {
  try {
    const auction = await Auction.findByIdAndDelete(req.params.id)
      .populate("seller", "name email");

    if (!auction) {
      return res.status(404).json({ message: "Auction not found" });
    }

    res.json({ message: "Auction deleted" });
  } catch (err) {
    console.error("deleteAuction error:", err);
    res.status(500).json({ message: "Server error deleting auction" });
  }
}

// =======================
// EXPORT ALL CONTROLLERS
// =======================
module.exports = {
  createAuction,
  listAuctions,
  listMyAuctions,
  getAuctionById,
  closeAuction,
  deleteAuction,
  updateAuction,
};
