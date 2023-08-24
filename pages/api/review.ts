import { NextApiHandler } from "next";
import db from "../../db/db";
import { Review } from "../../types/types";

/**
 * POST /api/review
 *
 * JSON Request body:
 */
interface CreateReviewBody {
  productId: string;
  /**
   * Must be an integer 1 through 5
   */
  rating: number;
  review: string;
}

/**
 * POST /api/review
 */
interface CreateReviewResponse {
  success: boolean;
  review: Review;
}

const createReview: NextApiHandler = async (req, res) => {
  if (req.method === "GET") {
    const productId = req.query.productId;

    if (typeof productId !== "string") {
      return res.status(400).json({
        success: false,
        message: "Missing productId query parameter",
      });
    }

    const result = await db.query(
      "SELECT * FROM review WHERE product_id = $1",
      [productId]
    );

    if (!Array.isArray(result)) {
      return res.status(500).end({
        success: false,
        message: "Could not fetch reviews",
      });
    }

    return res.status(200).json({
      success: true,
      reviews: result.map((review) => ({
        id: review.id,
        productId: review.product_id,
        rating: review.rating,
        comment: review.comment,
        createdAt: review.created_at,
      })),
    });
  }

  if (req.method === "POST") {
    const data = req.body as CreateReviewBody;

    if (
      data === null ||
      typeof data !== "object" ||
      typeof data.productId !== "string" ||
      typeof data.rating !== "number" ||
      typeof data.review !== "string"
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid request body",
      });
    }

    const body = data.review.toString().trim();

    if (body.length < 1) {
      return res.status(400).json({
        success: false,
        message: "Review must not be empty",
      });
    }

    if (data.rating < 1 || data.rating > 5 || !Number.isInteger(data.rating)) {
      return res.status(400).json({
        success: false,
        message: "Rating must be an integer between 1 and 5",
      });
    }

    const result = await db.query(
      "INSERT INTO review (product_id, rating, comment, created_at) VALUES ($1, $2, $3, $4) RETURNING *",
      [
        data.productId.toString(),
        data.rating.toString(),
        body,
        new Date().toISOString(),
      ]
    );

    if (!(Array.isArray(result) && result.length === 1)) {
      return res.status(500).json({
        success: false,
        message: "Could not create review",
      });
    }

    return res.status(200).json({
      review: {
        id: result[0].id,
        productId: result[0].product_id,
        rating: result[0].rating,
        comment: result[0].comment,
        createdAt: result[0].created_at,
      },
      success: true,
    });
  }

  return res.status(405).end();
};

export default createReview;
