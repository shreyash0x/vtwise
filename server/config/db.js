const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    
    if (!uri || uri === 'your_mongodb_atlas_connection_string_here') {
      console.error('\n❌ CRITICAL: MONGODB_URI is missing or not configured.');
      console.error('👉 Please update server/.env with your MongoDB Atlas connection string.\n');
      process.exit(1);
    }

    const conn = await mongoose.connect(uri);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
