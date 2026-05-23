import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  image: {
    type: String,
    required: true,
  },
  badge: {
    type: String,
    default: '',
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
}, {
  timestamps: true,
});

const Product = mongoose.model('Product', productSchema);
export default Product;
