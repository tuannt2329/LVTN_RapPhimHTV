const { Schema } = require('mongoose')

module.exports = new Schema({
  TenFilm: {
    type: String,
    validate: {
      validator: function (TenFilm) {
        return TenFilm && TenFilm.length > 0
      },
      message: props => `Input: ${props.value} is not valid!`
    },
    required: [true, 'Ten Film is required']
  },
  DaoDien: {
    type: String,
    validate: {
      validator: function (DaoDien) {
        return DaoDien && DaoDien.length > 0
      },
      message: props => `Input: ${props.value} is not valid!`
    },
    required: [true, 'Dao Dien is required']
  },
  TenNuocSX: {
    type: String,
    validate: {
      validator: function (TenNuocSX) {
        return TenNuocSX && TenNuocSX.length > 0
      },
      message: props => `Input: ${props.value} is not valid!`
    },
    required: [true, 'Ten Nuoc SX is required']
  },
  TomTat: {
    type: String,
    validate: {
      validator: function (TomTat) {
        return TomTat && TomTat.length > 0
      },
      message: props => `Input: ${props.value} is not valid!`
    },
    required: [true, 'Tom Tat is required']
  },
  TongThu: {
    type:Number,
    default : 0
  },
  TongChi: {
    type: Number,
    default: 0
  },
  NgayChieu: {
    type: Date,
    validate: {
      validator: function (NgayChieu) {
        return NgayChieu
      },
      message: props => `Input: ${props.value} is not valid!`
    },
    required: [true, 'Ngay Chieu is required']
  },
  NgayKetThuc: {
    type: Date,
    validate: {
      validator: function (NgayKetThuc) {
        return NgayKetThuc
      },
      message: props => `Input: ${props.value} is not valid!`
    },
    required: [true, 'Ngay Ket Thuc is required']
  },
  AnhBia: {
    type: String,
    validate: {
      validator: function (AnhBia) {
        return AnhBia && AnhBia.length > 0
      },
      message: props => `Input: ${props.value} is not valid!`
    },
    required: [true, 'AnhBia is required']
  },
  deleted: {
    type: Boolean,
    default: false
  },
  LuotLike: {
    type: Number,
    default: 0
  },
  LuotXem: {
    type: Number,
    default: 0
  },
  TheLoai: {
    type: String,
    validate: {
      validator: function (TheLoai) {
        return TheLoai && TheLoai.length > 0
      },
      message: props => `Input: ${props.value} is not valid!`
    },
    required: [true, 'The loai is required']
  }
})