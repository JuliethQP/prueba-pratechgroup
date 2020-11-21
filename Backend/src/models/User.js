const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    gender: {
      type: String,
      required: true,
    },
    profession: {
      type: String,
      required: true,
    },
    birthday:
    {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    }

  },
  {
    timestamps: true
  }
);

module.exports = model('User', userSchema);