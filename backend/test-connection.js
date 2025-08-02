const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    console.log('Connecting to MongoDB Atlas...');
    console.log('URI:', process.env.MONGODB_URI.replace(/:[^:@]*@/, ':****@')); // Hide password in logs
    
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    
    console.log('✅ MongoDB Atlas Connected Successfully!');
    console.log(`📍 Connected to: ${conn.connection.host}`);
    console.log(`🗄️  Database: ${conn.connection.name}`);
    
    // Test a simple operation
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log(`📂 Available collections: ${collections.length}`);
    
    if (collections.length > 0) {
      console.log('📋 Collections:', collections.map(c => c.name).join(', '));
    }
    
    process.exit(0);
  } catch (error) {
    console.error('❌ MongoDB Atlas Connection Failed:');
    console.error('Error:', error.message);
    process.exit(1);
  }
};

connectDB();
