import { Request, Response } from "express";
import multer from "multer";
import db from "../models/db";
import responseHandler from "../utils/responseHandler";

const upload: multer.Multer = multer();

export const addScrore = [
  upload.none(),
  async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.headers.userId;
      const entityId = req.body.entityId;

      const queryResult = await db.query(
        `
        INSER INTO hookah.rating_table`
      );

      responseHandler.success(req, res, 201, "msg", {
        success: true,
        message: "addScrore",
      });
    } catch (error) {
      responseHandler.error(req, res, error, "Табак не был создан");
    }
  },
];

export const updateRating = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    responseHandler.success(req, res, 201, "msg", {
      success: true,
      message: "updateRating",
    });
  } catch (error) {
    responseHandler.error(req, res, error, "Табак не был создан");
  }
};

export const deleteRating = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    responseHandler.success(req, res, 201, "msg", {
      success: true,
      message: "deleteRating",
    });
  } catch (error) {
    responseHandler.error(req, res, error, "Табак не был создан");
  }
};
