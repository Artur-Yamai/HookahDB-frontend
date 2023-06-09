import { Router } from "express";
import { ScoreController } from "../controllers";
import { checkAuth } from "../utils";

const router = Router();

router
  .route("/api/comment")
  .post(checkAuth, ScoreController.addScrore)
  .put(checkAuth, ScoreController.updateScore)
  .delete(checkAuth, ScoreController.deleteScore);

export { router };
