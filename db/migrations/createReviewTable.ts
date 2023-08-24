import db from "../db";
import { faker } from "@faker-js/faker";

// Define the Product schema
const createProductTable = `
  CREATE TABLE IF NOT EXISTS review(
    id SERIAL PRIMARY KEY,
    product_id VARCHAR(100),
    comment TEXT,
    rating INT,
    created_at TIMESTAMP DEFAULT NOW()
  )
`;

// Run the script
export const createReviewTable = async () => {
  console.log("Running db/migrations/createReviewTable migration...");
  await db.query(createProductTable);
  console.log("Completed db/migrations/createReviewTable migration.");
};
