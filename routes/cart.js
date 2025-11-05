var express = require("express");
var router = express.Router();
require("../models/connection");
const Cart = require("../models/cart");

router.post("/", (req, res) => {
  try {
    const { departure, arrival, price, date } = req.body;
    const newCart = new Cart({
      departure,
      arrival,
      price,
      date,
    });
    newCart.save().then((data) => res.json({ result: true, data }));
  } catch (err) {
    console.error(err);
    res.status(500).json({ result: false, error: "Probleme serveur" });
  }
});

router.get("/", async (req, res) => {
  try {
    const cart = await Cart.find();
    if (cart.length === 0) {
      res.json({ result: false, message: "Cart empty" });
    } else {
      res.json({ result: true, cart });
    }
  } catch (err) {
    console.error(err);
    res.send(500).json({ result: false, error: "database non connectée" });
  }
});

module.exports = router;
