import { Request, Response } from "express";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import { tobaccoDirName } from "../constants";
import { fileFilter } from "../utils";

import TobaccoModel from "../models/Tobacco";

const storage: multer.StorageEngine = multer.diskStorage({
  destination: tobaccoDirName,
  filename: (_, file, cb) => {
    const params: string[] = file.originalname.split(".");
    const newPhotoName: string =
      "tobacco." + uuidv4() + "." + params[params.length - 1];
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
      const files: any | any[] | undefined = req.files;

      if (!files?.length) {
        res.status(403).json({
          success: false,
          message: "Фотографии не подходят по формату",
        });
        return;
      }

      const { name, fabricator, description } = body;
      const userId = req.headers.userId;
      const photosUrl: string[] = files.map((file: any) => file.filename);

      const doc = new TobaccoModel({
        name,
        fabricator,
        description,
        userId,
        photosUrl,
      });

      const tobacco = await doc.save();

      res.status(201).json({
        success: true,
        message: "Данные о табаке сохранены",
        body: { id: tobacco._id },
      });
    } catch (error) {
      console.log("error tobacco create", error);
      res.status(500).json({
        success: false,
        message: "Ошибка сервера",
        body: error,
      });
    }
  },
];

export const getAll = async (req: Request, res: Response): Promise<void> => {
  res.json("Еще не готово");
};
export const getById = async (req: Request, res: Response): Promise<void> => {
  res.json("Еще не готово");
};
export const change = async (req: Request, res: Response): Promise<void> => {
  res.json("Еще не готово");
};
export const remove = async (req: Request, res: Response): Promise<void> => {
  res.json("Еще не готово");
};
