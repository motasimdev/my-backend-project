const mongoose = require('mongoose');

// ১. একটি Schema তৈরি করা
const userSchema = new mongoose.Schema({
  // STRING: নাম (সাথে trim এবং minlength ভ্যালিডেশন)
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true, // নামের আগে-পিছে স্পেস থাকলে কেটে দিবে
    minlength: [3, "Name must be at least 3 characters"]
  },

  // STRING & UNIQUE: ইমেইল (lowercase করে সেভ হবে)
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true, // একই ইমেইল দিয়ে দুইবার একাউন্ট হবে না
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'] // Email format check
  },

  // NUMBER: বয়স (Min/Max ভ্যালিডেশন)
  age: {
    type: Number,
    min: [18, "Must be at least 18 years old"],
    max: [100, "Too old for this platform"]
  },

  // BOOLEAN: একাউন্ট ভেরিফাইড কি না (Default value)
  isVerified: {
    type: Boolean,
    default: false
  },

  // ENUM: নির্দিষ্ট কিছু অপশন থেকে একটি সিলেক্ট করা
  role: {
    type: String,
    enum: ["user", "admin", "moderator"], // এই ৩টির বাইরে কিছু দিলে এরর দিবে
    default: "user"
  },

  // ARRAY: শখ বা ইন্টারেস্টের লিস্ট রাখা
  hobbies: {
    type: [String], // এটি স্ট্রিং এর একটি অ্যারে
    default: []
  },

  // OBJECTID (Relationship): অন্য একটি কালেকশনের সাথে কানেক্ট করা
  // যেমন: এই ইউজার কোন কোন পোস্ট করেছে তার রেফারেন্স
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post' // 'Post' কালেকশনের আইডি এখানে সেভ হবে
    }
  ],

  // DATE: একাউন্ট তৈরির সময় (অটোমেটিক বসবে)
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  // ২. Timestamps: এটি দিলে অটোমেটিক 'createdAt' এবং 'updatedAt' তৈরি হয়
  timestamps: true 
});

// ৩. মডেল হিসেবে এক্সপোর্ট করা
const User = mongoose.model('User', userSchema);
module.exports = User;


// এই বয়লারপ্লেটের বিশেষ কিছু দিক:
// Custom Error Messages: required: [true, "Name is required"] এভাবে লিখলে যদি কেউ নাম না দেয়, তবে মঙ্গো-ডিবি তোমার দেওয়া ওই মেসেজটাই এরর হিসেবে দেখাবে।

// Unique Index: unique: true দিলে ডাটাবেস লেভেলেই ডুপ্লিকেট ডাটা আসা বন্ধ হয়ে যাবে।

// Timestamps: স্কিমার শেষে { timestamps: true } যোগ করলে তোমাকে আর কষ্ট করে createdAt বা updatedAt লিখতে হবে না, মাঙ্গুজ নিজে থেকেই ডাটা সেভ বা আপডেটের সময় রেকর্ড করে রাখবে।

// Enum: এটি খুবই দরকারি যখন তুমি নির্দিষ্ট কিছু ক্যাটাগরি (যেমন: Gender, Role, Status) নিয়ে কাজ করো।

// শেখার জন্য ছোট একটি ট্রিক:
// তুমি যখন কন্ট্রোলারে ডাটা সেভ করবে, তখন এই ভ্যালিডেশনগুলো যদি ফেল করে (যেমন: বয়স ১৮ এর নিচে দিলে), তবে catch(error) ব্লকে ওই এররগুলো চলে আসবে।