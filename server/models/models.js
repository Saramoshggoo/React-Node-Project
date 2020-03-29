const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const emailRegexChecker = (val) => {
  if(/^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val)) {
      return true
  } else {
      return false
  }
}
const PrimaryObjectSchema = new mongoose.Schema({
  firstName:{
    type:String
  },
  lastName:{
    type:String
  },
  email:{
    type:String,
    required:[true, "Email is required"],
    validate:[emailRegexChecker, "Please enter a valid email"]
  },
  password:{
    type:String
  },

  boards: [
    {
      name:String,
      column1: {

        name: { type: String, default: "request" },
        items: []
      },
      column2: {
        name: { type: String, default: "start" },
        items: []
      },
      column3: {
        name: { type: String, default: "on process" },
        items: []
      },
      column4: {
        name: { type: String, default: "done" },
        items: []
      }
    }
  ]
}, { timestamps: true })

PrimaryObjectSchema.virtual('confirmPassword')
.get(() => this._confirmPassword)
.set((value) => this._confirmPassword = value)

PrimaryObjectSchema.pre('validate', function(next) {
    if(this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', "Password must match confirm password")
    }
    next();
})

PrimaryObjectSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 10)
    .then(hash => {
        this.password = hash;
        next();
    })
})

mongoose.model('PrimaryObject', PrimaryObjectSchema);

