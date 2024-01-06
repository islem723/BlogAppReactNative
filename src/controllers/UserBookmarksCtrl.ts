import { Request, Response } from "express";
import UserBookmarks from "../models/UserBookmarks";
import IUserBookmark from "../types";

export default async function createBookmark(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { userId, articleId }: IUserBookmark = req.body;
    const newBookmark = await UserBookmarks.create({
      User: userId,
      Article: articleId,
    });

    //populate the User and article in the newbookmark
    const bookmark = await UserBookmarks.populate(newBookmark, [
      { path: "User", model: "User" },
      { path: "Article", model: "Article" },
    ]);
    res.status(201).json(bookmark);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create bookmark" });
  }
}
export async function getAllfavoriteArticles(req: Request, res: Response) {
  const favoritearticle = await UserBookmarks.find()
    .populate("User")
    .populate("Article");
  res.status(200).json(favoritearticle);
}

//delete
export async function deleteBookmark(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { bookmarkId } = req.params;

    const deletedBookmark = await UserBookmarks.findByIdAndDelete(bookmarkId);

    if (!deletedBookmark) {
      res.status(404).json({ message: "Bookmark not found" });
      return;
    }

    res.status(200).json({ message: "Bookmark deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete bookmark" });
  }
}
