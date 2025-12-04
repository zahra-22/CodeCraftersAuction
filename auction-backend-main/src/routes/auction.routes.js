const express = require("express");
const router = express.Router();

const {
  createAuction,
  listAuctions,
  listMyAuctions,
  getAuctionById,
  closeAuction,
  deleteAuction,
  updateAuction,  // ⭐ make sure this is here
} = require("../controllers/auctionController");

const authMiddleware = require("../middleware/authMiddleware");

// Public: list all auctions
router.get("/", listAuctions);

// Must be before "/:id"
router.get("/mine", authMiddleware, listMyAuctions);

// Public: get one auction by id
router.get("/:id", getAuctionById);

// ⭐ NEW update route
router.put("/:id", authMiddleware, updateAuction);

// Protected create
router.post("/", authMiddleware, createAuction);

// Protected close
router.post("/:id/close", authMiddleware, closeAuction);

// Protected delete
router.delete("/:id", authMiddleware, deleteAuction);

module.exports = router;
