const { Schema } = require('mongoose')

module.exports = new Schema({
  LoaiVe: {
    type: String,
    enum: ['VIP', 'COUPLE'],
    default: "VIP"
  },
  GiaVe: {
    type: Number,
    default: 0
  }
})