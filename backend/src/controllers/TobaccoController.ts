import { Request, Response } from "express";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import { tobaccoDirName } from "../constants";
import { fileFilter } from "../utils";
import TobaccoModel from "../models/Tobacco";
import logger from "../logger/logger.service";

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
        res.status(403).json({
          success: false,
          message,
        });
        logger.success("post", req.path, `userId - ${userId}: ${message} `);
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
      res.status(201).json({
        success: true,
        message,
        body: { id: tobacco._id },
      });
      logger.success(
        "post",
        req.path,
        `tobaccoId - ${tobacco._id} : ${message}`
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
      "-isDeleted -__v -createdAt"
    );

    res.json({
      success: true,
      body: tobaccos,
    });

    logger.success("get", req.path);
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
      res.status(404).json({
        success: false,
        message,
      });

      logger.success("get", req.path, `tobaccoId - ${_id} : ${message}`);
      return;
    }

    res.json({
      success: true,
      body: tobacco,
    });

    logger.success("get", req.path, `tobaccoId - ${_id}`);
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

      await TobaccoModel.findOneAndUpdate(
        { _id },
        { name, fabricator, description, files, photosUrl }
      );

      res.json({
        success: true,
        body: {
          id: _id,
        },
      });

      logger.success(
        "put",
        req.path,
        `userId - ${userId} updated tobaccoId - ${_id}`
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

    await TobaccoModel.findOneAndUpdate({ _id }, { isDeleted: true });

    res.json({
      success: true,
      message: "Табак удален",
    });
    logger.success(
      "delete",
      req.path,
      `userId - ${userId} deleted tobaccoId - ${_id}`
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
