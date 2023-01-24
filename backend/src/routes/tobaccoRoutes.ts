import { Router } from "express";
import { TobaccoController } from "../controllers";
import { checkAuth } from "../utils";
const router = Router();

router.get("/api/tobaccos", TobaccoController.getAll);
router.post("/api/tobacco", checkAuth, TobaccoController.create);
router
  .route("/api/tobacco/:id")
  .get(TobaccoController.getById)
  .put(checkAuth, TobaccoController.update)
  .delete(checkAuth, TobaccoController.remove);

export { router };
