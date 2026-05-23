import express from 'express';
import Product from '../models/Product.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Get all products (flat list)
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get products grouped by category (matching frontend structure)
router.get('/categories', async (req, res) => {
  try {
    const products = await Product.find({});
    const categoryMapping = {
      burgers: 'Premium Burgers',
      pizza: 'Wood-Fired Pizza',
      shawarma: 'Arabic Shawarma',
      sides: 'Sides & Fries',
      drinks: 'Beverages'
    };

    const categoriesMap = {};
    Object.keys(categoryMapping).forEach(catId => {
      categoriesMap[catId] = {
        id: catId,
        name: categoryMapping[catId],
        items: []
      };
    });

    products.forEach(product => {
      const catId = product.category;
      if (!categoriesMap[catId]) {
        categoriesMap[catId] = {
          id: catId,
          name: catId.charAt(0).toUpperCase() + catId.slice(1),
          items: []
        };
      }
      categoriesMap[catId].items.push({
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        image: product.image,
        badge: product.badge
      });
    });

    res.json({ categories: Object.values(categoriesMap) });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Create product (Admin only)
router.post('/', auth, async (req, res) => {
  try {
    const { id, name, description, price, image, badge, category } = req.body;

    if (!id || !name || !description || !price || !image || !category) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const exists = await Product.findOne({ id });
    if (exists) {
      return res.status(400).json({ message: 'Product with this ID already exists' });
    }

    const newProduct = new Product({
      id,
      name,
      description,
      price,
      image,
      badge: badge || '',
      category
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Update product (Admin only)
router.put('/:id', auth, async (req, res) => {
  try {
    const { name, description, price, image, badge, category } = req.body;

    const product = await Product.findOne({ id: req.params.id });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (name) product.name = name;
    if (description) product.description = description;
    if (price !== undefined) product.price = price;
    if (image) product.image = image;
    if (badge !== undefined) product.badge = badge;
    if (category) product.category = category;

    await product.save();
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Delete product (Admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({ id: req.params.id });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

export default router;
