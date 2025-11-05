var express = require("express");
var router = express.Router();
require("../models/connection");
const Booking = require("../models/bookings");

router.post("/", async (req, res) => {
  try {
    const { id } = req.body;
    const newBooking = await new Booking({
      trip: id,
    }).save();
    return res.json({ result: true, newBooking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ result: false, error: "Probleme serveur" });
  }
});

router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find().populate("trip");
    if (bookings.length === 0) {
      res.json({ result: false, message: "Booking empty" });
    } else {
      res.json({ result: true, bookings });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ result: false, error: "database non connectée" });
  }
});

module.exports = router;
