// src/routes/auctionRoutes.js
const express = require('express');
const router = express.Router();

const {
  createAuction,
  listAuctions,
  listMyAuctions,
  getAuctionById,
  closeAuction,
  deleteAuction,
} = require('../controllers/auctionController');

const authMiddleware = require('../middleware/authMiddleware');

// Public: list all auctions
router.get('/', listAuctions);

//  Must be BEFORE '/:id'
router.get('/mine', authMiddleware, listMyAuctions);

// Public: get one auction by id
router.get('/:id', getAuctionById);

// Protected: create auction
router.post('/', authMiddleware, createAuction);

// Protected: close auction
router.post('/:id/close', authMiddleware, closeAuction);

// Protected: delete auction (used in item.html)
router.delete('/:id', authMiddleware, deleteAuction);

module.exports = router;
