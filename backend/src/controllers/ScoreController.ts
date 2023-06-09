import { Request, Response } from "express";
import db from "../models/db";
import responseHandler from "../utils/responseHandler";

export const addScrore = async (req: Request, res: Response): Promise<void> => {
  try {
    responseHandler.success(req, res, 201, "msg", {
      success: true,
      message: "addScrore",
    });
  } catch (error) {
    responseHandler.error(req, res, error, "Табак не был создан");
  }
};

export const updateScore = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    responseHandler.success(req, res, 201, "msg", {
      success: true,
      message: "updateScore",
    });
  } catch (error) {
    responseHandler.error(req, res, error, "Табак не был создан");
  }
};

export const deleteScore = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    responseHandler.success(req, res, 201, "msg", {
      success: true,
      message: "deleteScore",
    });
  } catch (error) {
    responseHandler.error(req, res, error, "Табак не был создан");
  }
};
