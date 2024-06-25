const mongoose = require('mongoose');

const materialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Material name is required'],
    trim: true
  },
  technology: {
    type: String,
    required: [true, 'Printing technology is required'],
    enum: ['FDM', 'SLA', 'SLS'] // Add more technologies if needed
  },
  colors: {
    type: [String],
    required: [true, 'At least one color is required'],
    validate: [arrayMinLength, 'At least one color must be specified']
  },
  pricePerGram: {
    type: Number,
    required: [true, 'Price per gram is required'],
    min: [0, 'Price per gram must be a positive number']
  },
  applicationTypes: {
    type: [String],
    required: [true, 'At least one application type is required'],
    validate: [arrayMinLength, 'At least one application type must be specified']
  },
  imageUrl: {
    type: String,
    required: [true, 'Image URL is required']
  }
}, {
  timestamps: true
});

function arrayMinLength(val) {
  return val.length > 0;
}

// Add any pre-save hooks or methods if needed
materialSchema.pre('save', function(next) {
  // add any pre-save logic here if needed
  next();
});

const Material = mongoose.model('Material', materialSchema);

module.exports = Material;