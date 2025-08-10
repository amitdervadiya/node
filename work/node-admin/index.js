const express = require('express');
const port = 2005;
require('dotenv').config();
const path = require('path');
const cors = require('cors');
const passport = require('./middleware/passport'); // JWT setup
const database = require('./config/database');

// Routes
const route = require('./routes/route');
const categoryroute = require("./routes/category");
const subcategoryroute = require('./routes/subcategory');
const excategoryroute = require("./routes/excategory");
const productroute = require('./routes/product');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: ['http://localhost:3000', 'https://your-frontend-url.com'],
  credentials: true
}));

// Static
app.use(express.static(path.join(__dirname, 'public')));
app.use('/upload', express.static(path.join(__dirname, 'upload')));

// Passport init (no session)
app.use(passport.initialize());

// Public routes
app.use('/', route);

// Protected routes
app.use('/category', passport.authenticate('jwt', { session: false }), categoryroute);
app.use('/subcategory', passport.authenticate('jwt', { session: false }), subcategoryroute);
app.use('/excategory', passport.authenticate('jwt', { session: false }), excategoryroute);
app.use('/product', passport.authenticate('jwt', { session: false }), productroute);

app.listen(port, (err) => {
  if (err) console.log(err);
  else console.log(`Server Started on port ${port}...`);
});
