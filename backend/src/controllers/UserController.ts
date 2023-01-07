// import jwt from "jsonwebtoken";
import { Response, Request } from "express";

export const register = (req: Request, res: Response) => {
  console.log("Регистрация прошла успешно");

  res.json({ success: true });
};
