var express = require("express");
var router = express.Router();
require("../models/connection");
const moment = require("moment");

const Trip = require("../models/trips");

router.get("/", async (req, res) => {
  try {
    const { departure, arrival, date } = req.query;

    if (!departure || !arrival || !date) {
      return res.json({ result: false, error: "Missing parameters" });
    }

    const startOfDay = moment(date).startOf("day").toDate();
    const endOfDay = moment(date).endOf("day").toDate();

    const trips = await Trip.find({
      departure: { $regex: new RegExp(`^${departure}$`, "i") },
      arrival: { $regex: new RegExp(`^${arrival}$`, "i") },
      date: { $gte: startOfDay, $lte: endOfDay },
    });

    if (trips.length === 0) {
      res.json({ result: false, message: "Pas de voyage trouvé" });
    } else {
      res.json({ result: true, trips });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ result: false, error: "problème serveur" });
  }
});

module.exports = router;
