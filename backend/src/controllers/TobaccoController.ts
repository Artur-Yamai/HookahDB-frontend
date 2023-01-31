import { Request, Response } from "express";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import { tobaccoDirName } from "../constants";
import { fileFilter } from "../utils";
import TobaccoModel from "../models/Tobacco";
import responseHandler from "../utils/responseHandler";

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
  upload.array("photos"),
  async (req: Request, res: Response): Promise<void> => {
    try {
      const body = req.body;
      const userId = req.headers.userId;
      const files: any | any[] | undefined = req.files;

      if (!files?.length) {
        const message: string = "Фотографии не подходят по формату";
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
      const photosUrl: string[] = files.map(
        (file: any) => `uploads/tobacco/${file.filename}`
      );

      const doc = new TobaccoModel({
        name,
        fabricator,
        description,
        userId,
        photosUrl,
      });

      const tobacco = await doc.save();

      const message: string = "Новый тобак сохранен";
      responseHandler.success(
        req,
        res,
        201,
        `tobaccoId - ${tobacco._id} : ${message}`,
        {
          success: true,
          message,
          body: { id: tobacco._id },
        }
      );
    } catch (error) {
      console.log("error POST /tobacco", error);
      res.status(500).json({
        success: false,
        message: "Ошибка сервера",
        body: error,
      });
    }
  },
];

export const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const tobaccos: any = await TobaccoModel.find(
      {
        isDeleted: false,
      },
      { photosUrl: { $slice: 1 }, name: 1, fabrivator: 1, description: 1 }
    );

    responseHandler.success(req, res, 201, "Получен список всех табаков", {
      success: true,
      body: tobaccos,
    });
  } catch (error) {
    console.log("error GET /tobaccos", error);
    res.status(500).json({
      success: false,
      message: "Ошибка сервера",
      body: error,
    });
  }
};

export const getById = async (req: Request, res: Response): Promise<void> => {
  try {
    const _id = req.params.id;
    const tobacco: any = await TobaccoModel.findOne(
      { _id, isDeleted: false },
      "-__v -isDeleted"
    );

    if (!tobacco) {
      const message: string = "Данные отстуствуют";

      responseHandler.exception(
        req,
        res,
        404,
        `tobaccoId - ${_id} : ${message}`,
        message
      );
      return;
    }

    responseHandler.success(req, res, 200, `tobaccoId - ${_id}`, {
      success: true,
      body: tobacco,
    });
  } catch (error) {
    console.log("error GET /tobacco/:id", error);
    res.status(500).json({
      success: false,
      message: "Ошибка сервера",
      body: error,
    });
  }
};

export const update = [
  upload.array("photos"),
  async (req: Request, res: Response): Promise<void> => {
    try {
      const files: any | any[] | undefined = req.files;
      const userId = req.headers.userId;

      const photosUrl: string[] = files.map((file: any) => file.filename);

      const { name, fabricator, description } = req.body;
      const _id = req.params.id;

      const tobacco = await TobaccoModel.findOneAndUpdate(
        { _id },
        { name, fabricator, description, files, photosUrl }
      );

      if (!tobacco) {
        const message = "табак не найден";
        responseHandler.exception(
          req,
          res,
          404,
          `tovaccoId - ${_id} : ${message}`,
          message
        );
        return;
      }

      responseHandler.success(
        req,
        res,
        200,
        `userId - ${userId} updated tobaccoId - ${_id}`,
        {
          success: true,
          id: _id,
        }
      );
    } catch (error) {
      console.log("error PUT /tobacco", error);
      res.status(500).json({
        success: false,
        message: "Ошибка сервера",
        body: error,
      });
    }
  },
];

export const remove = async (req: Request, res: Response): Promise<void> => {
  try {
    const _id: string = req.params.id;
    const userId = req.headers.userId;

    const tobacco = await TobaccoModel.findOneAndUpdate(
      { _id },
      { isDeleted: true }
    );

    if (!tobacco) {
      const message = "Такого табака нет";
      responseHandler.exception(
        req,
        res,
        404,
        `tobaccoId - ${_id} - ${message}`,
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
        `tobaccoId - ${_id} - ${message}`,
        message
      );
      return;
    }

    responseHandler.success(
      req,
      res,
      200,
      `userId - ${userId} deleted tobaccoId - ${_id}`,
      {
        success: true,
        message: "Табак удален",
      }
    );
  } catch (error) {
    console.log("error DELETE /tobacco", error);
    res.status(500).json({
      success: false,
      message: "Ошибка сервера",
      body: error,
    });
  }
};
