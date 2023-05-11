import { Response, Request, NextFunction } from "express";
import responseHandler from "../utils/responseHandler";
import FavoriteTobaccoModel from "../models/FavoriteTobacco";

export const addToFavoritesTobacco = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { tobaccoId } = req.body;
    const userId = req.headers.userId;

    const hasTobacco = await FavoriteTobaccoModel.findOne({
      tobacco: tobaccoId,
      user: userId,
    });

    if (hasTobacco) {
      const message = "Этот табак уже находится у Вас в избранном";
      responseHandler.exception(
        req,
        res,
        406,
        `userId - ${userId} : попытка добавления более одного раза в избранное tobaccoId - ${tobaccoId}`,
        message
      );
      return;
    }

    const doc = new FavoriteTobaccoModel({
      tobacco: tobaccoId,
      user: userId,
    });

    const ft = await doc.save();

    const message = "Табак успешно добавлен в избранное";
    responseHandler.success(
      req,
      res,
      201,
      `faboriteTobaccoId - ${ft.id} : ${message}`,
      {
        success: true,
        message,
        body: {
          id: ft.id,
        },
      }
    );
  } catch (error) {
    responseHandler.error(req, res, error, "Табак небыл добавлен в избранное");
  }
};

export const removeToFavoritesTobacco = async (req: Request, res: Response) => {
  try {
    const tobaccoId = req.body.id;
    const userId = req.headers.userId;

    const result = await FavoriteTobaccoModel.deleteOne({
      tobacco: tobaccoId,
      user: userId,
    });

    if (result.acknowledged) {
      const message = "Табак удален из избранного";
      responseHandler.success(
        req,
        res,
        201,
        `tobaccoId - ${tobaccoId} удален из избранного у userId - ${userId}`,
        {
          success: true,
          message,
        }
      );
    } else {
      const message = "Табак не был удален из избранного";
      responseHandler.exception(
        req,
        res,
        400,
        `tobaccoId - ${tobaccoId} не был удален из избранного у userId - ${userId}`,
        message
      );
    }
  } catch (error) {
    responseHandler.error(req, res, error, "Табак небыл удален из избранного");
  }
};
