import { NextApiHandler } from "next";
import db from "../../../db/db";
import { Product } from "../../../types/types";

/**
 * GET /api/products
 *
 * Query parameters:
 * - skip: number of products to skip
 * - take: number of products to take (limit)
 */
export type GetProductsQuery = {
  /**
   * Number of products to skip
   */
  page?: number;
  /**
   * Number of products to take (limit)
   */
  take?: number;
};

/**
 * GET /api/products
 *
 * Your API must return a response in this format.
 */
export type GetProductsResponse = {
  /**
   * Number of skipped products
   */
  page: number;
  /**
   * Number of taken products (limit)
   */
  take: number;
  /**
   * Number of products in this page
   * (may be less than `take` if there are not enough products)
   */
  count: number;
  /**
   * Total number of products in the database
   */
  totalCount: number;
  /**
   * Total number of pages
   */
  pages: number;
  /**
   * Products in this page
   */
  products: Product[];
};

const productsIndex: NextApiHandler = async (req, res) => {
  // Query params
  const { take: _take, page: _page } = req.query;

  const take = _take && !isNaN(Number(_take)) ? Math.max(0, Number(_take)) : 10;
  const page = _page && !isNaN(Number(_page)) ? Math.max(1, Number(_page)) : 1;
  const skip = (page - 1) * take;

  try {
    const result = (await db.query(
      'SELECT * FROM "product" LIMIT $1 OFFSET $2',
      [take.toString(), skip.toString()]
    )) as Product[];

    const _count = (await db.query('SELECT count(*) FROM "product"')) as {
      count: string;
    };

    const totalCount = parseInt(_count[0].count);

    const response: GetProductsResponse = {
      page: page,
      take: take,
      count: result.length,
      totalCount,
      pages: Math.ceil(totalCount / Math.max(1, take)), // avoid division by zero if take is 0
      products: result,
    };
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Internal server error",
      message: error.message,
    });
  }
};

export default productsIndex;
