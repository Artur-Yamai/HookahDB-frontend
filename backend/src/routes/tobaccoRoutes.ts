import { Router } from "express";
import { TobaccoController } from "../controllers";
import { checkAuth } from "../utils";
const router = Router();

router.get("/tobaccos", TobaccoController.getAll);
router.post("/tobacco", checkAuth, TobaccoController.create);
router
  .route("/tobacco/:id")
  .get(TobaccoController.getById)
  .put(checkAuth, TobaccoController.update)
  .delete(checkAuth, TobaccoController.remove);

export { router };
