const jwt = require('jsonwebtoken');
const { HttpError } = require('../helpers');
const { User } = require('../models/mongooseModel/user');
const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  console.log('authenticate start');
  const { authorization } = req.headers;
  const [bearer, token] = authorization.split('  ');
  if (bearer !== 'Bearer') {
    next(HttpError(401));
  }
  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findOne({ _id: id });
    if (!user || !user.token || user.token !== token) {
      next(HttpError(401));
    }
    req.user = user;
    next();
  } catch {
    next(HttpError(401, 'Not authorized'));
  }
};

module.exports = authenticate;
