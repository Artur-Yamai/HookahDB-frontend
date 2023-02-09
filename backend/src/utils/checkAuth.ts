import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { jwtSectretKey } from "../secrets";
import responseHandler from "./responseHandler";

export default (req: Request, res: Response, next: NextFunction) => {
  const token: string = (req.headers.authorization || "").replace(
    /Bearer\s?/,
    ""
  );

  const noAccessFunc = () => {
    responseHandler.exception(
      req,
      res,
      403,
      `Нет доступа: token - ${token}`,
      "Нет доступа"
    );
  };

  if (token) {
    try {
      const decoded: string | jwt.JwtPayload = jwt.verify(token, jwtSectretKey);
      if (typeof decoded !== "string") {
        req.headers.userId = decoded.id;
        next();
        return;
      } else {
        return noAccessFunc();
      }
    } catch (error) {
      return noAccessFunc();
    }
  } else {
    return noAccessFunc();
  }
};
