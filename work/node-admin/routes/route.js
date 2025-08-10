const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('../middleware/passport');
const upload = require('../middleware/upload');
const handler = require('../controller/handler');

const route = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'rnw_jwt_secret';

// Public: login page
route.get('/', handler.loginform);

// Public: login action → returns JWT
route.post('/login', (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({ message: info?.message || 'Login failed' });
    }

    const payload = { id: user._id, email: user.email };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

    res.json({ token, user });
  })(req, res, next);
});

// Protected: dashboard
route.get('/dashboard', passport.authenticate('jwt', { session: false }), handler.dashboard);

// Protected: admin actions
route.get('/addAdmin', passport.authenticate('jwt', { session: false }), handler.addAdmin);
route.get('/viewAdmin', passport.authenticate('jwt', { session: false }), handler.viewAdmin);
route.post('/addNewAdmin', passport.authenticate('jwt', { session: false }), upload, handler.addNewAdmin);

// Public: profile & password reset
route.get('/profile', handler.profile);
route.get('/changepassword', handler.changepassword);
route.post('/changepass', handler.changepass);
route.post('/forgotpass', handler.forgotpass);
route.post('/recoverypass', handler.recoverypass);

// Public: logout (client just removes token)
route.get('/logout', (req, res) => {
  res.json({ message: 'Logged out. Please delete token on client side.' });
});

module.exports = route;
