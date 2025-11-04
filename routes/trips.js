var express = require("express");
var router = express.Router();
require("../models/connection");
const Trip = require("../models/trips");

router.get("/", async (req, res) => {
  const { departure, arrival, date } = req.body;
  const trips = await Trip.find({
    $and: [{ departure }, { arrival }, { date }],
  });
  res.json({ trips });
});

module.exports = router;
