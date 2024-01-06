import express from "express";
import Register from "../controllers/UserCtrl";

const userRoutes = express.Router();

userRoutes.route("/create").post(Register);

export default userRoutes;
