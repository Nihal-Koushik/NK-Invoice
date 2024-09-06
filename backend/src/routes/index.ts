import express, { NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import sequelize from "../db";
import userRoutes from "./User";

export const app = express();

const port = 3000;

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});


app.use(bodyParser.json());

// middleware to log incoming requests
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`\n${req.method} ${req.url}`);
  next();
});

// Use the routes
app.use("/user", userRoutes);

sequelize.sync()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  })
  .catch((error: Error) => {
    console.error("Failed to sync database:", error);
  });

