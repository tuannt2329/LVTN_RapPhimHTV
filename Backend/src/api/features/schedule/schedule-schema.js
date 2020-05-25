const { Schema } = require('mongoose')

module.exports = new Schema({
  TenFilm: {
  type: String,
  required: true
  },
  TenPhong: {
    type: String,
    required: true
  },
  ThoiGianChieu: {
    type: Date,
    required: true
  },
  ThoiGianKetThuc: {
    type: Date,
    required: true
  },
  deleted: {
    type: Boolean,
    default: false
  }
})