import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { registerValidation, loginValidation } from "./validations";
import { UserController, TobaccoController } from "./controllers";
import { handleValidationErrors, checkAuth } from "./utils";
import { dbURL } from "./sectets";
import { avatarsDirName, tobaccoDirName } from "./constants";

mongoose.set("strictQuery", false); // вопрос
mongoose
  .connect(dbURL)
  .then(() => console.log("DB is ok"))
  .catch((err: Error) => console.error("DB error", err));

const port: number = 6060;
const app: express.Express = express();
app.use(express.json());
app.use("/uploads/avatar", express.static(avatarsDirName));
app.use("/uploads/tobacco", express.static(tobaccoDirName));
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

app.put("/user/saveAvatar", checkAuth, UserController.saveAvatar);

app.get("/tobaccos", TobaccoController.getAll);
app.get("/tobacco/:id", TobaccoController.getById);
app.post("/tobacco", checkAuth, TobaccoController.create);
app.put("/tobacco/:id", checkAuth, TobaccoController.update);
app.delete("/tobacco/:id", checkAuth, TobaccoController.remove);

app.listen(port, () => {
  console.log("Server OK");
  console.log(`http://localhost:${port}`);
});
