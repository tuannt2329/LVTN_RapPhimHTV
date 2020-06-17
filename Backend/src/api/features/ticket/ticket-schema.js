const { Schema } = require('mongoose')

module.exports = new Schema({
  email: {
      type: String,
      required: true
  },
  TenFilm: {
      type: String,
      required: true
  },
  TenPhong: {
      type: String,
      required: true
  },
  TenGhe: {
      type: [String],
      required: true
  },
  ThoiGianChieu: {
      type: Date,
      required: true
  },
  status: {
      type: Boolean,
      default: false
  },
  ThoiGianDat: {
      type: Date,
      default: Date.now()
  },
  ThoiGianXacNhan: {
      type: Date,
      default: Date.now()
  },
  NguoiXacNhan: {
      type: String,
      default: ""
  },
  GiaVe: {
    type: Number,
    default: 0
  },
  payed: {
      type: Boolean,
      default:false
  }
})