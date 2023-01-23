import {RequestHandler} from "express";
import {ParamsDictionary} from "express-serve-static-core";
import {Query, Locals} from "../handler-type";

export const validatePeopleMiddleware: RequestHandler<
  ParamsDictionary,
  unknown,
  unknown,
  Query,
  Locals
> = (req, res, next) => {
  const people = req.people;
  if (people === undefined) {
    next();
    return;
  }

  if (people < 1) {
    res.locals.errors.push("People must be a number greater than or equal to 1");
  }

  next();
};
