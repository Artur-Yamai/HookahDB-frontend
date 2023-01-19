import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { registerValidation, loginValidation } from "./validations";
import { UserController } from "./controllers";
import { handleValidationErrors, checkAuth } from "./utils";
import { dbURL } from "./sectets";
import { fileStorageDirName } from "./constants";

mongoose.set("strictQuery", false); // вопрос
mongoose
  .connect(dbURL)
  .then(() => console.log("DB is ok"))
  .catch((err: Error) => console.error("DB error", err));

const port: number = 6060;
const app: express.Express = express();
app.use(express.json());
app.use("/uploads", express.static(fileStorageDirName));
app.use(cors());

app.get("/", (req, res) => {
  res.send("<h1>In process</h1>");
});

app.post(
  "/user/register",
  registerValidation,
  handleValidationErrors,
  UserController.register
);

app.post(
  "/user/auth",
  loginValidation,
  handleValidationErrors,
  UserController.auth
);

app.get("/auth/byToken", checkAuth, UserController.getUserById);

app.post("/user/saveAvatar", checkAuth, UserController.saveAvatar);

app.listen(port, () => {
  console.log("Server OK");
  console.log(`http://localhost:${port}`);
});
