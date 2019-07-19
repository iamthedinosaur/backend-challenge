import mongoose from 'mongoose';
let Schema = mongoose.Schema;

let locationSchema = new Schema({
  street: String,
  city: String,
  state: String,
  zip: String,
  country: String
})

let organizationSchema = new Schema({
  name: String,
  addresses: [locationSchema]
})

module.exports = mongoose.model('Organization', organizationSchema);
