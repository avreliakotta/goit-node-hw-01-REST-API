const { Schema, model } = require('mongoose');
const { handleMongooseError } = require('../../helpers');

const phoneRegexp = /^(\+\d{1,2}\s?)?(\(\d{1,4}\))?[0-9.\-\s]{6,}$/;

const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
    required: true,
    match: phoneRegexp,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
});

contactSchema.post('save', handleMongooseError);
const Contact = model('contact', contactSchema);
module.exports = Contact;
