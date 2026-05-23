import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Product from './models/Product.js';
import Admin from './models/Admin.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const seedDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri || mongoUri.includes('<username>')) {
      console.error('\nError: Please configure a valid MONGODB_URI in your server/.env file before running seed.js.\n');
      process.exit(1);
    }

    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(mongoUri);
    console.log('Connected successfully!');

    // Clear existing data
    console.log('Clearing old products and admins...');
    await Product.deleteMany({});
    await Admin.deleteMany({});

    // Read menu.json
    console.log('Reading menu.json...');
    const menuPath = path.join(__dirname, '../src/data/menu.json');
    const menuData = JSON.parse(fs.readFileSync(menuPath, 'utf8'));

    const productsToInsert = [];
    menuData.categories.forEach(category => {
      category.items.forEach(item => {
        productsToInsert.push({
          id: item.id,
          name: item.name,
          description: item.description,
          price: item.price,
          image: item.image,
          badge: item.badge || '',
          category: category.id
        });
      });
    });

    console.log(`Inserting ${productsToInsert.length} products...`);
    await Product.insertMany(productsToInsert);
    console.log('Products seeded successfully!');

    // Create default Admin account
    console.log('Creating default Admin user...');
    const defaultAdmin = new Admin({
      username: 'admin',
      password: 'adminpassword123'
    });
    await defaultAdmin.save();
    console.log('----------------------------------------------------');
    console.log('Default Admin Account Created Successfully:');
    console.log('Username: admin');
    console.log('Password: adminpassword123');
    console.log('----------------------------------------------------');

    console.log('Database seeding process completed.');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding database:', err);
    process.exit(1);
  }
};

seedDB();
