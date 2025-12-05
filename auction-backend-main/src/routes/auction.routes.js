const express = require("express");
const router = express.Router();

const {
  createAuction,
  listAuctions,
  listMyAuctions,
  getAuctionById,
  closeAuction,
  deleteAuction,
  updateAuction,
} = require("../controllers/auctionController");

const authMiddleware = require("../middleware/authMiddleware");

// Public: list all auctions
router.get("/", listAuctions);

// User's auctions
router.get("/mine", authMiddleware, listMyAuctions);

// Protected: create
router.post("/", authMiddleware, createAuction);

// Protected: update auction
router.put("/:id", authMiddleware, updateAuction);

// Protected: close auction
router.post("/:id/close", authMiddleware, closeAuction);

// Protected: delete auction
router.delete("/:id", authMiddleware, deleteAuction);

// Public: get auction by id (MUST BE LAST)
router.get("/:id", getAuctionById);

module.exports = router;
