const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const userSchema = new mongoose.Schema({
  name:{
    type:String,
    required:[true,'Please provide name'],
    minlength:3,
    maxlength:50  
  },
  email:{
    type:String,
    required:[true,'Please provide name'],
    match:[
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'please provide valid email'
    ],
    unique:true
    // minlength:3,
    // maxlength:50  
  },
  password:{
    type:String,
    required:[true,'Please provide password'],
    minlength:6,
  }
});

userSchema.pre('save', async function(next) { //next param is optional in mongoose 5.0 and above
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next(); //optional in moongoose 5.0 and above
});

userSchema.methods.createJWT = async function() {
  return jwt.sign(
    {userId: this._id, name: this.name }, 
    process.env.JWT_SECRET || 'jwtSecret',
    { expiresIn: '30d' }
  );
};

userSchema.methods.verifyPassword = async function(candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

module.exports = mongoose.model('User', userSchema);