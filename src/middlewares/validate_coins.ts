import {RequestHandler} from "express";
import {ParamsDictionary} from "express-serve-static-core";
import {Query, Locals} from "../handler-type";

export const validateCoinsMiddleware: RequestHandler<
  ParamsDictionary,
  unknown,
  unknown,
  Query,
  Locals
> = (req, res, next) => {
  const coins = req.coins;
  if (coins === undefined) {
    next();
    return;
  }

  if (coins < 1) {
    res.locals.errors.push("Coins must be a number greater than or equal to 1");
  }

  next();
};
