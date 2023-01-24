import { Router } from "express";
import { registerValidation, loginValidation } from "../validations";
import { UserController } from "../controllers";

import { handleValidationErrors, checkAuth } from "../utils";

const router = Router();

router.post(
  "/user/register",
  registerValidation,
  handleValidationErrors,
  UserController.register
);
router.post(
  "/user/auth",
  loginValidation,
  handleValidationErrors,
  UserController.auth
);
router.get("/user/authByToken", checkAuth, UserController.getUserById);
router.put("/user/saveAvatar", checkAuth, UserController.saveAvatar);

export { router };
