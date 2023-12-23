import mongoose from "mongoose";

export default async function connectDB(connectedCallback: () => void) {
  const mongoUrl = "mongodb://127.0.0.1:27017/blogsApp";
  try {
    const conn = await mongoose.connect(mongoUrl);
    if (conn) {
      console.log(`connected to: ${conn.connection.db.databaseName}`);
      connectedCallback();
    }
  } catch (error) {
    console.log("could not connect to database", error);
  }
}
