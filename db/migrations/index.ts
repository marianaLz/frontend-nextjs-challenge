import db from "../db";
import { addProductsMigration } from "./addProducts";
import { createReviewTable } from "./createReviewTable";

const executeMigrations = async () => {
  await addProductsMigration();
  await createReviewTable();
  await db.close();
};

executeMigrations();
