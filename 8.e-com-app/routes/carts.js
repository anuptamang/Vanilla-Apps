const express = require('express');
const cartsRepo = require('../repositories/carts');

const router = express.Router();

// Receive a post request to add an item to a cart
router.post('/cart/products', async (req, res) => {
  // Figure out the cart!
  let cart;
  if (!req.session.cartId) {
    // We dont have a cart, we need to create one,
    // and stor the cart id on the <req className="session cartId
    // property
    cart = await cartsRepo.create({ items: [] });
    req.session.cartId = cart.id;
  } else {
    // we have a cart! lets get it from the repo
    cart = await cartsRepo.getOne(req.session.cartId);
  }

  console.log(cart);

  // Either increment quanity for existing product or add new product

  res.send('product added..');
});

// Receive a GET request to show all items in cart

// Receive a post request to delete an item from a cart

module.exports = router;
