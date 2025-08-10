const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const adminschema = require('../model/adminSchema');
const jwt = require('jsonwebtoken');

// Local Strategy for login
passport.use('local', new LocalStrategy(
  { usernameField: 'email' },
  async (email, password, done) => {
    try {
      let admin = await adminschema.findOne({ email });
      if (!admin) return done(null, false, { message: 'Invalid email or password' });

      // TODO: Replace with bcrypt.compare if passwords are hashed
      if (admin.password !== password) {
        return done(null, false, { message: 'Invalid email or password' });
      }

      return done(null, admin);
    } catch (err) {
      return done(err);
    }
  }
));

// JWT Strategy for protecting routes
passport.use('jwt', new JwtStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET || 'default_jwt_secret'
  },
  async (jwtPayload, done) => {
    try {
      const admin = await adminschema.findById(jwtPayload.id);
      if (admin) {
        return done(null, admin);
      } else {
        return done(null, false);
      }
    } catch (err) {
      return done(err, false);
    }
  }
));

// Helper to issue JWT token
passport.issueJWT = (user) => {
  const payload = { id: user._id, email: user.email };
  const token = jwt.sign(payload, process.env.JWT_SECRET || 'default_jwt_secret', {
    expiresIn: '1h'
  });
  return token;
};

module.exports = passport;
