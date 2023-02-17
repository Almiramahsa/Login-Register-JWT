import mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    requires: [true, ' Please provide unique Username'],
    unique: [true, 'Username Exist'],
  },
  password: {
    type: String,
    requires: [true, 'Please provide a password'],
    unique: [false],
  },
  email: {
    type: String,
    requires: [true, 'Please provide an email'],
    unique: [true],
  },
  firstName: { type: String },
  lastName: { type: String },
  mobile: { type: Number },
  address: { type: String },
  profile: { type: String },
});

export default mongoose.model.Users || mongoose.model('User', UserSchema);
