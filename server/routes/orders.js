import express from 'express';
import Order from '../models/Order.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Create a new order (Public)
router.post('/', async (req, res) => {
  try {
    const { items, customerDetails, subtotal, tax, deliveryFee, totalAmount } = req.body;

    if (!items || items.length === 0 || !customerDetails || subtotal === undefined || totalAmount === undefined) {
      return res.status(400).json({ message: 'Missing order details or items' });
    }

    const newOrder = new Order({
      items,
      customerDetails,
      subtotal,
      tax,
      deliveryFee: deliveryFee !== undefined ? deliveryFee : 150,
      totalAmount
    });

    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get all orders (Admin only)
router.get('/', auth, async (req, res) => {
  try {
    const orders = await Order.find({}).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Update order status (Admin only)
router.put('/:id/status', auth, async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['pending', 'confirmed', 'completed', 'cancelled'];

    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid or missing status' });
    }

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.status = status;
    await order.save();
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

export default router;
