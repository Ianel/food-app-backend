const express = require("express");
const {
  findAllDishes,
  findADish,
} = require("../controllers/dishes.controller");

const router = express.Router();

router.get("/", findAllDishes);
router.get("/:id", findADish);

module.exports = router;
