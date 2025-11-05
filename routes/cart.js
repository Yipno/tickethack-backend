var express = require("express");
var router = express.Router();
require("../models/connection");
require("../models/trips");
const Cart = require("../models/cart");

router.post("/", async (req, res) => {
  try {
    const { id } = req.body;
    const newCart = await new Cart({
      trip: id,
    }).save();
    return res.json({ result: true, newCart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ result: false, error: "Probleme serveur" });
  }
});

router.get("/", async (req, res) => {
  try {
    const cart = await Cart.find().populate("trip");
    if (cart.length === 0) {
      res.json({ result: false, message: "Cart empty" });
    } else {
      console.log(cart);
      res.json({ result: true, cart });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ result: false, error: "database non connectée" });
  }
});

module.exports = router;
