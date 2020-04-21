const express = require('express');
const productsNotFoundTemplate = require('../views/products/notFound');

const router = express.Router();

router.get('*', (req, res) => {
  res.send(productsNotFoundTemplate());
});

module.exports = router;
