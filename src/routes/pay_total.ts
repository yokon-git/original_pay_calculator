import express from "express";
import {ParamsDictionary} from "express-serve-static-core";
import {Query, Locals} from "../handler-type";
import {requiredCoinsMiddleware} from "../middlewares/required_coins";
import {requiredPeopleMiddleware} from "../middlewares/required_people";
import {validateCoinsMiddleware} from "../middlewares/validate_coins";
import {validatePeopleMiddleware} from "../middlewares/validate_people";

const title = "PAY TOTAL";
const payTotalRouter = express.Router();

payTotalRouter.get<ParamsDictionary, unknown, unknown, Query, Locals>(
  "/",
  requiredCoinsMiddleware,
  requiredPeopleMiddleware,
  validateCoinsMiddleware,
  validatePeopleMiddleware,
  (req, res) => {
    if (
      res.locals.errors.length > 0 ||
      (req.query.coins === undefined && req.query.people === undefined)
    ) {
      res.render("pay_total/index", {
        title,
        coins: req.query.coins || "",
        people: req.query.people || "",
      });
      return;
    }

    const coins = req.coins;
    if (coins === undefined) {
      throw new Error("Unexpected Coins");
    }

    const people = req.people;
    if (people === undefined) {
      throw new Error("Unexpected People");
    }

    const result = coins * people;
    res.render("pay_total/result", {coins, people, result, title});
  }
);

export {payTotalRouter};
