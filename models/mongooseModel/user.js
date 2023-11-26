const { Schema, model } = require('mongoose');
const Joi = require('joi');
const { handleMongooseError } = require('../../helpers');
const subscriptionList = ['starter', 'pro', 'business'];
const authSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, 'Set password for user'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    subscription: {
      type: String,
      enum: subscriptionList,
      default: 'starter',
    },
    token: {
      type: String,
    },
  },
  { versionKey: false }
);
authSchema.post('save', handleMongooseError);
const registerSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().email().required(),
  subscription: Joi.string().valid(...subscriptionList),
});

const loginSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().email().required(),
});

const schemas = {
  registerSchema,
  loginSchema,
};

const User = model('user', authSchema);
module.exports = {
  User,
  schemas,
};
