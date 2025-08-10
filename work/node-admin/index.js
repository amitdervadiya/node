const express = require('express');
const port = process.env.PORT || 2005;
require('dotenv').config();
const path = require('path');
const cors = require('cors');
const passport = require('./middleware/passport'); // Will handle local + JWT strategies
const database = require('./config/database');

// Routes
const route = require('./routes/route');
const categoryroute = require("./routes/category");
const subcategoryroute = require('./routes/subcategory');
const excategoryroute = require("./routes/excategory");
const productroute = require('./routes/product');

const app = express();

app.set('view engine','ejs')
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: ['http://localhost:3000', 'https://your-frontend-url.com'],
  credentials: true
}));

// Static
app.use(express.static(path.join(__dirname, 'public')));
app.use('/upload', express.static(path.join(__dirname, 'upload')));

// Passport init (no sessions at all)
app.use(passport.initialize());

// Public routes
app.use('/', route);

// Protected routes using JWT
const { verifyJWT } = require('./middleware/verifyJWT');
app.use('/category', verifyJWT, categoryroute);
app.use('/subcategory', verifyJWT, subcategoryroute);
app.use('/excategory', verifyJWT, excategoryroute);
app.use('/product', verifyJWT, productroute);

app.listen(port, (err) => {
  if (err) console.log(err);
  else console.log(`Server Started on port ${port}...`);
});
