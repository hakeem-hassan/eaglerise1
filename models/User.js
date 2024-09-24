/// Import Mongoose and Bcrypt
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the User schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true, // The username field is mandatory
    unique: true,   // The username must be unique
  },
  email: {
    type: String,
    required: true, // The email field is mandatory
    unique: true,   // The email must be unique
  },
  password: {
    type: String,
    required: true, // The password field is mandatory
  },
}, { timestamps: true }); // Automatically create `createdAt` and `updatedAt` fields

// Hash password before saving the user
userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10); // 10 is the salt rounds
  }
  next();
});

// Method to compare password
userSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

// Create and export the User model
const User = mongoose.model('User', userSchema);
module.exports = User;
