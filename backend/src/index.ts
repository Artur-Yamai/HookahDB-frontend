import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { dbURL } from "./secrets";
import { avatarsDirName, tobaccoDirName } from "./constants";
import { UserRouter, TobaccoRoutes, CommentRoutes } from "./routes";

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

app.use(UserRouter);
app.use(TobaccoRoutes);
app.use(CommentRoutes);

app.listen(port, () => {
  console.log("Server OK");
  console.log(`http://localhost:${port}`);
});
