import {RequestHandler} from "express";
import {ParamsDictionary} from "express-serve-static-core";
import {Query, Locals} from "../handler-type";

export const requiredCoinsMiddleware: RequestHandler<
  ParamsDictionary,
  unknown,
  unknown,
  Query,
  Locals
> = (req, res, next) => {
  const coins = req.query.coins;
  if (coins === undefined) {
    next();
    return;
  }

  if (coins === "") {
    res.locals.errors.push("Coins required");
    next();
    return;
  }

  if (req.query.people === undefined) {
    res.locals.errors.push("Unexpected Input: Coins and People both required");
    next();
    return;
  }

  const numCoins = Number(coins);
  if (Number.isNaN(numCoins)) {
    res.locals.errors.push("Unexpected Input: Coins");
    next();
    return;
  }

  req.coins = numCoins;
  next();
};
