import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import UserModel from "../models/User";
import CommentModel from "../models/Comment";
import { jwtSectretKey } from "../secrets";
import { avatarsDirName } from "../constants";
import { fileFilter } from "../utils";
import responseHandler from "../utils/responseHandler";

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
    const { email, password, login } = req.body;
    if (email) {
      console.log(email, password, login);
      return;
    }
    const salt = await bcrypt.genSalt(10);
    const passwordHash: string = await bcrypt.hash(password, salt);

    const doc = new UserModel({
      email,
      passwordHash,
      login,
    });

    const newUser = await doc.save();

    responseHandler.success(req, res, 201, `userId - ${newUser.id}`, {
      success: true,
    });
  } catch (error: any) {
    responseHandler.error(req, res, error, "Не удалось зарегестрироваться");
  }
};

export const auth = async (req: Request, res: Response) => {
  try {
    // TODO: заменить any на что-то адекватное
    const user: any = await UserModel.findOne({
      login: req.body.login,
    });

    if (!user) {
      const message: string = "Неверный логин или пароль";

      responseHandler.exception(
        req,
        res,
        404,
        `${req.body.login} - ${message}`,
        message
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
        `${req.body.login} - ${message}`,
        message
      );
      return;
    }

    const token = jwt.sign(
      {
        id: user.id,
      },
      jwtSectretKey,
      {
        expiresIn: "30d",
      }
    );

    const { passwordHash, __v, ...userData } = user._doc;

    responseHandler.success(req, res, 200, `userId - ${userData.id}`, {
      success: true,
      data: { userData, token },
    });
  } catch (error) {
    responseHandler.error(req, res, error, "Не удалось авторизоваться");
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

    responseHandler.success(req, res, 200, `userId - ${user.id}`, {
      success: true,
      // TODO: сделать тело ответа сообразно ответам в других функциях
      userData: user,
    });
  } catch (error) {
    responseHandler.error(req, res, error, "Нет доступа");
  }
};

export const saveAvatar = [
  upload.single("photo"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.body.id;
      console.log(userId);
      await UserModel.findOneAndUpdate(
        { _id: userId },
        {
          avatarUrl: `uploads/avatar/${req.file?.filename}`,
        }
      );
      next();
    } catch (error) {
      responseHandler.error(req, res, error, "Не удалось сохранить аватар");
    }
  },
  getUserById,
];

export const loginExists = async (req: Request, res: Response) => {
  try {
    const login = req.params.login;

    if (!login) {
      const message: string = "login отсутсвует";
      responseHandler.exception(req, res, 400, message, message);
      return;
    }

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
    responseHandler.error(req, res, error, "Ошибка сервера");
  }
};

export const emailExists = async (req: Request, res: Response) => {
  try {
    const email = req.params.email;

    if (!email) {
      const message: string = "email отсутсвует";
      responseHandler.exception(req, res, 400, message, message);
      return;
    }

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
    responseHandler.error(req, res, error, "Ошибка сервера");
  }
};

export const getUserComments = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.params.id;

    const comments = await CommentModel.find(
      {
        user: userId,
        isDeleted: false,
      },
      "-__v -isDeleted"
    )
      .sort("-createdAt")
      .populate("user", "login avatarUrl")
      .exec();

    const message: string = "Получен список комментариев";
    responseHandler.success(req, res, 201, ``, {
      success: true,
      message,
      body: comments,
    });
  } catch (error) {
    console.log("error GET /user/{id}/comments \n", error);
    res.status(500).json({
      success: false,
      message: "Ошибка сервера",
      body: error,
    });
  }
};
