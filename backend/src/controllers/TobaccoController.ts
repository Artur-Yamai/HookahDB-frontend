import { Request, Response } from "express";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import { tobaccoDirName } from "../constants";
import { fileFilter } from "../utils";
import TobaccoModel from "../models/Tobacco";
import FavoriteTobaccoModel from "../models/FavoriteTobacco";
import CommentModel from "../models/Comment";
import responseHandler from "../utils/responseHandler";
import { tokenDecoded } from "../helpers";

const storage: multer.StorageEngine = multer.diskStorage({
  destination: tobaccoDirName,
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

export const create = [
  upload.single("photo"),
  async (req: Request, res: Response): Promise<void> => {
    try {
      const body = req.body;
      const userId = req.headers.userId;
      const fileName: string | undefined = req.file?.filename;

      if (!fileName) {
        const message: string = "Фотография не подходят по формату";
        responseHandler.exception(
          req,
          res,
          403,
          `userId - ${userId}: ${message}`,
          message
        );
        return;
      }

      const { name, fabricator, description } = body;

      const doc = new TobaccoModel({
        name,
        fabricator,
        description,
        userId,
        photoUrl: `uploads/tobacco/${fileName}`,
      });

      const tobacco = await doc.save();

      const message: string = "Новый тобак сохранен";
      responseHandler.success(
        req,
        res,
        201,
        `tobaccoId - ${tobacco.id} : ${message}`,
        {
          success: true,
          message,
          body: { id: tobacco.id },
        }
      );
    } catch (error) {
      responseHandler.error(req, res, error, "Табак не был создан");
    }
  },
];

export const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const tobaccos: any = await TobaccoModel.find(
      {
        isDeleted: false,
      },
      "photoUrl name fabrivator"
    );

    responseHandler.success(req, res, 201, "Получен список всех табаков", {
      success: true,
      body: tobaccos,
    });
  } catch (error) {
    responseHandler.error(req, res, error, "Табаки небыли получены");
  }
};

export const getById = async (req: Request, res: Response): Promise<void> => {
  try {
    let isFavorite: boolean = false;
    const id = req.params.id;
    const tobacco: any = await TobaccoModel.findOne(
      { _id: id, isDeleted: false },
      "-__v -isDeleted"
    );

    if (!tobacco) {
      const message: string = "Данные отстуствуют";

      responseHandler.exception(
        req,
        res,
        404,
        `tobaccoId - ${id} : ${message}`,
        message
      );
      return;
    }

    const token: string | undefined = req.headers.authorization;
    if (token) {
      const data = tokenDecoded(token);
      if (typeof data !== "string") {
        isFavorite = !!(await FavoriteTobaccoModel.findOne({
          user: data.id,
          tobacco: tobacco.id,
        }));
      }
    }

    tobacco._doc.isFavorite = isFavorite;

    responseHandler.success(req, res, 200, `tobaccoId - ${id}`, {
      success: true,
      body: tobacco,
    });
  } catch (error) {
    responseHandler.error(req, res, error, "Табак не был получен");
  }
};

export const update = [
  upload.single("photo"),
  async (req: Request, res: Response): Promise<void> => {
    try {
      const fileName: string | undefined = req.file?.filename;
      const userId = req.headers.userId;

      const { name, fabricator, description, id } = req.body;

      const tobacco: any = await TobaccoModel.findOneAndUpdate(
        { _id: id },
        {
          name,
          fabricator,
          description,
          photoUrl: fileName ? `uploads/tobacco/${fileName}` : fileName,
        },
        { new: true }
      );

      if (!tobacco) {
        const message = "табак не найден";
        responseHandler.exception(
          req,
          res,
          404,
          `Табак "${name}" - не найден`,
          message
        );
        return;
      }

      const { __v, isDeleted, ...tobaccoClearData } = tobacco._doc;

      responseHandler.success(
        req,
        res,
        200,
        `userId - ${userId} updated tobaccoId - ${id}`,
        {
          success: true,
          message: "Тобак успешно обнавлен",
          body: tobaccoClearData,
        }
      );
    } catch (error) {
      responseHandler.error(req, res, error, "Табак не был обнавлен");
    }
  },
];

export const remove = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.body.id;
    const userId = req.headers.userId;

    const tobacco = await TobaccoModel.findOneAndUpdate(
      { _id: id },
      { isDeleted: true }
    );

    if (!tobacco) {
      const message = "Такого табака нет";
      responseHandler.exception(
        req,
        res,
        404,
        `tobaccoId - ${id} - ${message}`,
        message
      );
      return;
    }

    if (tobacco.isDeleted) {
      const message = "Данный табак уже удален";
      responseHandler.exception(
        req,
        res,
        404,
        `tobaccoId - ${id} - ${message}`,
        message
      );
      return;
    }

    responseHandler.success(
      req,
      res,
      200,
      `userId - ${userId} deleted tobaccoId - ${id}`,
      {
        success: true,
        message: "Табак удален",
      }
    );
  } catch (error) {
    responseHandler.error(req, res, error, "Табак не был удален");
  }
};

export const getTobaccoComments = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const tobaccoId = req.params.id;

    const comments = await CommentModel.find(
      {
        tobaccoId,
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
    responseHandler.error(
      req,
      res,
      error,
      "Комментарии табака не были получены"
    );
  }
};
