import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import multer from "multer";
import UserModel from "../models/User";
import { jwtSectretKey } from "../secrets";
import { v4 as uuidv4 } from "uuid";
import { avatarsDirName } from "../constants";
import { fileFilter } from "../utils";
import responseHandler from "../utils/responseHandler";

interface IUserRegister {
  email: string;
  password: string;
  login: string;
}

const storage: multer.StorageEngine = multer.diskStorage({
  destination: avatarsDirName,
  filename: (_, file, cb) => {
    const params: string[] = file.originalname.split(".");
    const newPhotoName: string = uuidv4() + "." + params[params.length - 1];
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

    const newUser = await doc.save();

    responseHandler.success(req, res, 201, `userId - ${newUser._id}`, {
      success: true,
    });
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
      const message: string = "Пользователь не найден";

      responseHandler.exception(
        req,
        res,
        404,
        `${req.body.login} - ${message}`
      );
      return;
    }

    const isValid: boolean = await bcrypt.compare(
      req.body.password,
      user.passwordHash
    );

    if (!isValid) {
      const message: string = "Неверный логин или пароль";
      responseHandler.exception(
        req,
        res,
        401,
        `${req.body.login} - ${message}`
      );
      return;
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

    const { passwordHash, __v, ...userData } = user._doc;

    responseHandler.success(req, res, 200, `userId - ${userData._id}`, {
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
    const userId = req.headers.userId;
    const user = await UserModel.findById(userId, "-passwordHash -__v");

    if (!user) {
      const message: string = "Пользователь ненайден";
      responseHandler.exception(
        req,
        res,
        404,
        `userId - ${userId} : ${message}`,
        message
      );
      return;
    }

    responseHandler.success(req, res, 200, `userId - ${user._id}`, {
      success: true,
      // TODO: сделать тело ответа сообразно ответам в других функциях
      userData: user,
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
      const userId = req.headers.userId;
      await UserModel.findOneAndUpdate(
        { _id: userId },
        {
          avatarUrl: `uploads/avatar/${req.file?.filename}`,
        }
      );
      next();
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

    const user = await UserModel.findOne({ login }, "-passwordHash");

    responseHandler.success(
      req,
      res,
      200,
      `login "${login}" ${!!user ? "exist" : "not exist"}`,
      {
        success: true,
        body: {
          isExists: !!user,
        },
      }
    );
  } catch (error) {
    console.log("error POST /api/user/loginExists", error);
    res.status(500).json({
      success: false,
      message: "Ошибка сервера",
      body: error,
    });
  }
};

export const emailExists = async (req: Request, res: Response) => {
  try {
    const email: string = req.body.email;

    const user = await UserModel.findOne({ email }, "-passwordHash");

    responseHandler.success(
      req,
      res,
      200,
      `email "${email}" ${!!user ? "exist" : "not exist"}`,
      {
        success: true,
        body: {
          isExists: !!user,
        },
      }
    );
  } catch (error) {
    console.log("error POST /api/user/emailExists", error);
    res.status(500).json({
      success: false,
      message: "Ошибка сервера",
      body: error,
    });
  }
};
