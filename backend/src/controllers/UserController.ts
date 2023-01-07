import { Response, Request } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import UserModel from "../models/User";
import { jwtSectretKey } from "../sectets";

interface IUserRegister {
  email: string;
  password: string;
  login: string;
}

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, login }: IUserRegister = req.body;

    const salt = await bcrypt.genSalt(10);
    const passwordHash: string = await bcrypt.hash(password, salt);

    const doc = new UserModel({
      email,
      passwordHash,
      login,
    });

    const user = await doc.save();

    const token = jwt.sign(
      {
        _id: user._id,
      },
      jwtSectretKey,
      {
        expiresIn: "30d",
      }
    );

    res.json({ success: true, token });
  } catch (error) {
    console.log("error registration", error);
    res.status(500).json({
      message: "Не удалось зарегестриролваться",
      success: false,
      error,
    });
  }
};
