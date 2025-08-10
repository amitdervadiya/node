const express = require('express');
const route = express.Router();
const handler = require('../controller/handler');
const upload = require('../middleware/upload');
const passport = require('../middleware/passport');
const jwt = require('jsonwebtoken');
const { verifyJWT } = require('../middleware/verifyJWT');


route.get('/', handler.loginform);


route.post('/login', passport.authenticate('local', { session: false }), (req, res) => {
    const token = jwt.sign(
        { id: req.user.id, email: req.user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
    res.json({ token, message: 'Login successful' });
});

// Protected dashboard
route.get('/dashboard', verifyJWT, handler.dashboard);

// Admin actions (protected)
route.get('/addAdmin', verifyJWT, handler.addAdmin);
route.get('/viewAdmin', verifyJWT, handler.viewAdmin);
route.post('/addNewAdmin', verifyJWT, upload, handler.addNewAdmin);

// Public profile & password reset
route.get('/profile', handler.profile);
route.get('/changepassword', handler.changepassword);
route.post('/changepass', handler.changepass);

// Logout (client just deletes token)
route.get('/logout', (req, res) => {
    res.json({ message: 'Logged out — please delete token on client' });
});

// Password recovery (public)
route.post('/forgotpass', handler.forgotpass);
route.post('/recoverypass', handler.recoverypass);

module.exports = route;
