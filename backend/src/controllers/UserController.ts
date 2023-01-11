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

    await doc.save();

    res
      .status(201)
      .json({ success: true, message: "Регистрация прошла успешно" });
  } catch (error) {
    console.log("error registration", error);
    res.status(500).json({
      message: "Не удалось зарегестрироваться",
      success: false,
      error,
    });
  }
};

export const auth = async (req: Request, res: Response) => {
  try {
    // TODO: заменить any на что-то адекватное
    const user: any = await UserModel.findOne({
      login: req.body.login,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Пользователь не найден",
      });
    }

    const isValid: boolean = await bcrypt.compare(
      req.body.password,
      user.passwordHash
    );

    if (!isValid) {
      res.status(401).json({
        success: false,
        message: "Неверный логин или пароль",
      });
    }

    const token = jwt.sign(
      {
        _id: user._id,
      },
      jwtSectretKey,
      {
        expiresIn: "30d",
      }
    );

    const { passwordHash, ...userData } = user._doc;

    return res.json({
      success: true,
      data: { userData, token },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Неудалось авторизоваться",
      error,
    });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    // TODO: заменить any на что-то адекватное
    const user: any = await UserModel.findById(req.body.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Пользователь ненайден",
      });
    }

    const { passwordHash, ...userData } = user._doc;

    res.json({
      success: true,
      userData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Нет доступа",
    });
  }
};
