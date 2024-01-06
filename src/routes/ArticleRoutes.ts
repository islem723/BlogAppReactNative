import express from "express";

import createArticle, {
  getArticleById,
  getAllArticles,
  UpdateArticle,
} from "../controllers/ArticleCtrl";

const articleRoutes = express.Router();

articleRoutes.route("/").post(createArticle).get(getAllArticles);

articleRoutes.route("/:articleId").get(getArticleById);
articleRoutes.route("/:articleid").put(UpdateArticle);

export default articleRoutes;
