import { Request, Response } from "express";
import CommentModel from "../models/Comment";
import responseHandler from "../utils/responseHandler";

export const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const { tobaccoId, text } = req.body;
    const userId = req.headers.userId;

    const doc = new CommentModel({
      tobaccoId,
      text,
      user: userId,
    });

    const comment = await doc.save();

    const message = "Комментарий успешно сохранен";
    responseHandler.success(
      req,
      res,
      201,
      `tobaccoId - ${comment.id} : ${message}`,
      {
        success: true,
        message,
        body: {
          id: comment.id,
        },
      }
    );
  } catch (error) {
    console.log("error POST /comments", error);
    res.status(500).json({
      success: false,
      message: "Ошибка сервера",
      body: error,
    });
  }
};

export const getById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    const comment: any = await CommentModel.findOne(
      { _id: id, isDeleted: false },
      "-__v -isDeleted"
    )
      .populate("user", "login avatarUrl")
      .exec();

    if (!comment) {
      const message: string = "Данные отстуствуют";
      responseHandler.exception(
        req,
        res,
        404,
        `commentId - ${id} : ${message}`,
        message
      );
      return;
    }

    responseHandler.success(req, res, 200, `tobaccoId - ${id}`, {
      success: true,
      body: comment,
    });
  } catch (error) {
    console.log("error GET /comment/{id}", error);
    res.status(500).json({
      success: false,
      message: "Ошибка сервера",
      body: error,
    });
  }
};

export const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const comments = await CommentModel.find(
      {
        isDeleted: false,
      },
      "-__v -isDeleted"
    )
      .sort("-createdAt")
      .populate("user", "login avatarUrl")
      .exec();

    responseHandler.success(req, res, 201, "Получен список всех комментариев", {
      success: true,
      body: comments,
    });
  } catch (error) {
    console.log("error GET /comments", error);
    res.status(500).json({
      success: false,
      message: "Ошибка сервера",
      body: error,
    });
  }
};

export const update = async (req: Request, res: Response): Promise<void> => {
  try {
    const { tobaccoId, text, id } = req.body;
    const userId = req.headers.userId;

    const comment: any = await CommentModel.findOneAndUpdate(
      { _id: id, tobaccoId, userId },
      { text },
      { new: true }
    );

    if (!comment) {
      const message = "Комментарий не найден";
      responseHandler.exception(req, res, 404, message, message);
      return;
    }

    const { __v, isDeleted, ...commentClearData } = comment._doc;

    responseHandler.success(
      req,
      res,
      200,
      `userId - ${userId} updated commentId - ${id}`,
      {
        success: true,
        message: "Тобак успешно обнавлен",
        body: commentClearData,
      }
    );
  } catch (error) {
    console.log("error PUT /comments", error);
    res.status(500).json({
      success: false,
      message: "Ошибка сервера",
      body: error,
    });
  }
};

export const remove = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.body.id;
    const userId = req.headers.userId;

    const comment = await CommentModel.findOneAndUpdate(
      {
        _id: id,
        user: userId,
      },
      { isDeleted: true }
    );

    if (!comment) {
      const message = "Такой комментарий не найден";
      responseHandler.exception(
        req,
        res,
        404,
        `commentId - ${id} - ${message}`,
        message
      );
      return;
    }

    if (comment.isDeleted) {
      const message = "Данный комментарий уже удален";
      responseHandler.exception(
        req,
        res,
        404,
        `commentId - ${id} - ${message}`,
        message
      );
      return;
    }

    responseHandler.success(
      req,
      res,
      200,
      `userId - ${userId} deleted commentId - ${id}`,
      {
        success: true,
        message: "Комментарий удален",
      }
    );
  } catch (error) {
    console.log("error DELETE /comments", error);
    res.status(500).json({
      success: false,
      message: "Ошибка сервера",
      body: error,
    });
  }
};
