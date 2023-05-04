import { Router } from "express";
import multer from "multer";
import { CommentController } from "../controllers";
import { checkAuth } from "../utils";

const router = Router();
const upload: multer.Multer = multer();

router.get("/api/comment/:id", CommentController.getById);
router
  .route("/api/comments")
  .get(CommentController.getAll)
  .post(upload.none(), checkAuth, CommentController.create)
  .put(upload.none(), checkAuth, CommentController.update)
  .delete(checkAuth, CommentController.remove);

export { router };
