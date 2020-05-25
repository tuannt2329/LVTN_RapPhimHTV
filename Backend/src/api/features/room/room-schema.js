const { Schema } = require('mongoose')

module.exports = new Schema({
  TenPhong: {
    type: String,
    required: true
  },
  TongSoGhe: {
      type: Number,
      required: true
  },
  busyStatus: {
      type: Boolean,
      default: false
  }
})