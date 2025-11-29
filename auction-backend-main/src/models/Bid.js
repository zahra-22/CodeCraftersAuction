const mongoose = require('mongoose');

const bidSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
      min: 1
    },

    bidder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },

    auction: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Auction',
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Bid', bidSchema);
