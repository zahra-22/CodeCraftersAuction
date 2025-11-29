const mongoose = require('mongoose');

const auctionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 2
    },

    description: {
      type: String,
      default: "",
      minlength: 3
    },

    startingPrice: {
      type: Number,
      required: true,
      min: 1
    },

    currentPrice: {
      type: Number,
      default: null
    },

    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },

    endTime: {
      type: Date,
      required: true
    },

    status: {
      type: String,
      enum: ["OPEN", "CLOSED", "CANCELLED"],
      default: "OPEN"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Auction', auctionSchema);
