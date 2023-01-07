import { body, ValidationChain, validationResult } from "express-validator";
import { Response, Request, NextFunction } from "express";

export const registerValidation = [
  body("email", "Неверный формат почты").isEmail(),
  body("password", "Пароль должен быть минимум 5 символов").isLength({
    min: 5,
  }),
  body("login", "Ник должен содержать от 4 до 30 символов").isLength({
    min: 4,
    max: 30,
  }),
];
