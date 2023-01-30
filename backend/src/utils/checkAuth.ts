import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { jwtSectretKey } from "../secrets";

export default (req: Request, res: Response, next: NextFunction) => {
  const noAccessFunc = () => {
    res.status(403).json({
      success: false,
      message: "Нет доступа",
    });
  };

  const token: string = (req.headers.authorization || "").replace(
    /Bearer\s?/,
    ""
  );

  if (token) {
    try {
      const decoded: string | jwt.JwtPayload = jwt.verify(token, jwtSectretKey);
      if (typeof decoded !== "string") {
        req.headers.userId = decoded._id;
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
