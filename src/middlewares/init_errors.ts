import {RequestHandler} from "express";

export const initErrors: RequestHandler = (req, res, next) => {
  res.locals.errors = [];
  next();
};
