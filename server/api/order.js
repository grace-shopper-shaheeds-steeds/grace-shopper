const express = require('express');
const router = express.Router()
const Order = require('../db/models/order')
module.exports = router

router.param('id', (req, res, next, id) => {
    Order.findById(id)
      .then(item => {
        // if no item found, send 404
        if (!item) res.sendStatus(404);
        else {
          req.item = item;
          // we have to call next here so that the actual route we want to hit will match after the router.param
          next();
        }
      })
      .catch(next);
  });

  // retrieve all orders
router.get('/', (req, res, next ) => {
    Order.findAll({
      include: {all: true}
    })
      .then(results => {
        res.send(results);
      })
      .catch(next);
  });

// get order by id
router.get('/:id', (req, res, next) => {
    // router.param has now taken care of this!!
    res.send(req.item);
  });

// post a new order to product
router.post('/', (req, res, next ) => {
  console.log(req.body)

    Order.create(req.body)
      .then(product => {
        res.send(product);
      })
      .catch(next);
  });


