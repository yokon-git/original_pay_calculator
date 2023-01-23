import {RequestHandler} from "express";
import {ParamsDictionary} from "express-serve-static-core";
import {Query, Locals} from "../handler-type";

export const requiredPeopleMiddleware: RequestHandler<
  ParamsDictionary,
  unknown,
  unknown,
  Query,
  Locals
> = (req, res, next) => {
  const people = req.query.people;
  if (people === undefined) {
    next();
    return;
  }

  if (people === "") {
    res.locals.errors.push("People required");
    next();
    return;
  }

  if (req.query.coins === undefined) {
    res.locals.errors.push("Unexpected Input: Coins and People both required");
    next();
    return;
  }

  const numPeople = Number(people);
  if (Number.isNaN(numPeople)) {
    res.locals.errors.push("Unexpected Input: People");
    next();
    return;
  }

  req.people = numPeople;
  next();
};
