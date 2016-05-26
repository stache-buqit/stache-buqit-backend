'use strict';

const mongoose = require('mongoose');

const uploadSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  photo_api_data: {
    type: String,
  }
}, {
  timestamps: true,
});

const Upload = mongoose.model('Upload', uploadSchema);

module.exports = Upload;
