import express, { NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import sequelize from "../db";
import userRoutes from "./User";
import clientRoutes from "./client";
import bankDetailsRoutes from "./bankDetails";
import itemsDetailsRoutes from "./itemsDetails";
import invoiceRoutes from "./Invoice";
import userClientRelationsRoutes from "./userClientRelations";

const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// middleware to log incoming requests
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`\n${req.method} ${req.url}`);
  next();
});

// Use the routes
app.use("/user", userRoutes);
app.use("/client", clientRoutes);
app.use("/bankDetails", bankDetailsRoutes);
app.use("/itemsDetails", itemsDetailsRoutes);
app.use("/Invoice", invoiceRoutes);
app.use("/userClientRelations", userClientRelationsRoutes);
sequelize.sync()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  })
  .catch((error: Error) => {
    console.error("Failed to sync database:", error);
  });

export default app;