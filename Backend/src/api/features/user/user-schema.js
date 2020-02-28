const { Schema } = require('mongoose')
const bcrypt = require('bcrypt')
const saltRounds = 10
const validatorRegex = require('../../util/validator-regex')

module.exports = new Schema({
  firstName: {
    type: String,
    validate: {
      validator: function (firstName) {
        return firstName && firstName.length > 0
      },
      message: props => `Input: ${props.value} is not valid!`
    },
    required: [true, 'First name is required']
  },
  lastName: {
    type: String,
    validate: {
      validator: function (lastName) {
        return lastName && lastName.length > 0
      },
      message: props => `Input: ${props.value} is not valid!`
    },
    required: [true, 'Last name is required']
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    default: 'other'
  },
  email: {
    type: String,
    validate: {
      validator: function (email) {
        const regex = validatorRegex.email
        return regex.test(email)
      }
    }
  },
  image: String,
  createDate: {
    type: Date,
    default: Date()
  },
  active: {
    type: Boolean,
    default: false
  },
  password: {
    type: String,
    validate: {
      validator: function (password) {
        this.password = bcrypt.hashSync(password, saltRounds)
      }
    }
  }
})
