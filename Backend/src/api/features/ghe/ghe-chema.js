const { Schema } = require('mongoose')

module.exports = new Schema({
  TenPhong: {
      type: String,
      required: true
  },
  TenGhe: {
      type: String,
      required: true
  },
  status: {
      type: Boolean,
      default: false
  }
})