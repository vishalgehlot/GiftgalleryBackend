import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  contact: {
    type: String,
    unique: true,
    maxlength: 10
  },
  password: {
    type: String,
    required: true,
  },
}, {
  timestamps: true
});

userSchema.pre('save', async function (next) {
  if (this.isModified('password') || this.isNew) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

userSchema.methods.checkPassword = function (password) {
  return bcrypt.compare(password, this.password);
};

userSchema.virtual('cart', {
  ref: 'Cart',
  localField: '_id',
  foreignField: 'userId',
  justOne: true,
  options: { onDelete: 'CASCADE' }
});

userSchema.virtual('order', {
  ref: 'Order',
  localField: '_id',
  foreignField: 'userId',
  justOne: true,
  options: { onDelete: 'CASCADE' }
});

userSchema.virtual('contacts', {
  ref: 'ContactUs',
  localField: '_id',
  foreignField: 'userId',
  options: { onDelete: 'CASCADE' }
});

const User = mongoose.model('user', userSchema);

export default User;
