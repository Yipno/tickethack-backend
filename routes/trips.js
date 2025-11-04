var express = require("express");
var router = express.Router();
require("../models/connection");
const moment = require("moment");

const Trip = require("../models/trips");

router.get("/", async (req, res) => {
  const { departure, arrival, date } = req.query;
  console.log(departure, arrival, date);

  const startOfDay = moment(date).startOf("day").toDate();
  const endOfDay = moment(date).endOf("day").toDate();
  console.log(startOfDay, endOfDay);
  const trips = await Trip.find({
    departure: { $regex: new RegExp(`^${departure}$`, "i") },
    arrival: { $regex: new RegExp(`^${arrival}$`, "i") },
    date: { $gte: startOfDay, $lte: endOfDay },
  });
  console.log(trips[0].date);
  if (!trips[0]) res.json({ result: false });
  else res.json({ result: true, trips });
});

module.exports = router;
