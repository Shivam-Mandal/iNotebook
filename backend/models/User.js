import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: false  
  },
  googleId: {
    type: String, 
    required: false,
    unique: true,
    sparse: true 
  }
},{timestamps:true});

const User = mongoose.model('User', UserSchema);
export default User;