const express = require('express');
const bodyParser = require('body-parser'); // Middleware
const cookieSession = require('cookie-session');
const authRouter = require('./routes/admin/auth');
const productsRouter = require('./routes/admin/products');

const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true })); // Middlewae IMPL for all app.REQUEST
app.use(
  cookieSession({
    keys: ['djlkd;safkjsdfj'],
  })
);

app.use(authRouter);
app.use(productsRouter);

app.listen(5055, () => {
  console.log('App listening on port 5055!');
});