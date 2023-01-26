import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import multer from "multer";
import UserModel from "../models/User";
import { jwtSectretKey } from "../sectets";
import { v4 as uuidv4 } from "uuid";
import { avatarsDirName } from "../constants";
import { fileFilter } from "../utils";

interface IUserRegister {
  email: string;
  password: string;
  login: string;
}

const storage: multer.StorageEngine = multer.diskStorage({
  destination: avatarsDirName,
  filename: (_, file, cb) => {
    const params: string[] = file.originalname.split(".");
    const newPhotoName: string =
      "avatar." + uuidv4() + "." + params[params.length - 1];
    cb(null, newPhotoName);
  },
});

const upload: multer.Multer = multer({
  storage,
  fileFilter: fileFilter(["image/png", "image/jpeg", "image/jpg"]),
});

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
  } catch (error: any) {
    console.log("error registration", error.message);
    res.status(500).json("Не удалось зарегестрироваться");
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
    const user: any = await UserModel.findById(
      req.headers.userId,
      "-passwordHash -__v"
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Пользователь ненайден",
      });
    }

    res.json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Нет доступа",
    });
  }
};

export const saveAvatar = [
  upload.single("avatar"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await UserModel.findOneAndUpdate(
        { _id: req.headers.userId },
        {
          avatarUrl: `uploads/${req.file?.filename}`,
        }
      );
      next();
      return;
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Не удалось сохранить аватар",
      });
      console.log("saveAvatar error", error);
    }
  },
  getUserById,
];

export const loginExists = async (req: Request, res: Response) => {
  try {
    const login: string = req.body.login;

    const user = await UserModel.findOne({ login: login }, "-passwordHash");

    res.json({
      success: true,
      body: {
        isExists: !!user,
      },
    });
  } catch (error) {
    console.log("error POST /api/user/loginExists", error);
    res.status(500).json({
      success: false,
      message: "Ошибка сервера",
      body: error,
    });
  }
};
