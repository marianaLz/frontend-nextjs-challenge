# NextJS Ecommerce App
This is a simple ecommerce app built with NextJS and Postgres.

## Setup with Docker (recommended)
```bash
docker-compose up
```

## Setup without Docker
1. [Install Postgres](https://www.postgresql.org/download/macosx/)
2. Install Node 16 
3. Install Yarn
4. Install dependencies
```bash
yarn
```

## Running the app
```bash
yarn dev
```

## Resources
- ✅ Searching the internet for answers (Stackoverflow, Google)
- ❌ Github Copilot (please turn this off in your IDE)
- ❌ Any AI based code generation tool

## Assignment
### Understanding
1. Run the sample application.
2. Click the example button on the home page and read through the documentation.
3. Don't forget to commit and push your code before the test is over!

### Tasks
#### Product List
We need to display a list of products in the `/products` page. In this task:

1. Create a component to display an individual Product 
2. Call the API to fetch a page of Products
3. Display the Products in a list.

A user should be able to see the product name, price, small image, and description. 

Clicking on a product should open the product details page for that product, routing them to `/pages/product/{id}`.

The frontend code lives in `/pages/products/index.tsx`. 

The API is: `GET /api/products?take=${take}&page=${page}`
- `take` is the number of products to return per page
- `page` is the current page number, 1-indexed

The `GetProductsQuery` and `GetProductsResponse` types are defined in `pages/api/product/index.ts`. You should not have to modify the API code or change these types. 

#### Product Pagination
The Product List page needs to support rendering thousands of Products. Implement frontend pagination to support paginating through the products.

Modify the `/products` page to display the following controls:

- **Back button**. Navigates to the previous page. Disabled on the first page.
- **Select/Dropdown**. Displays current page number. On open, display all page numbers, with the current page number selected. Clicking on a page number displays the Products in that page.
- **Next button**. Navigates to the next page. Disabled on the first page.

The `take` is always 10. The page number starts at 1. 

#### Reviews
The `ProductDetailPage` component displays detailed information about a Product, including Reviews. In this task:

1. Display all Reviews in the `ProductDetailPage` for a given product
2. Create a form to submit a new review for a product
3. Ensure the form has proper validation and handles all edge cases gracefully

The frontend code lives in `/pages/product/[id].tsx`. Fetching of reviews is already implemented for you.

A Review must have:
- A rating between 1 and 5
- A review body
- A Product ID
- Must use the Star icon, located in `/components/Star.tsx`

The API code for both fetching and creating a Review lives in `pages/api/review.ts`. 

The `CreateReviewBody` and `CreateReviewResponse` types are defined in `pages/api/review.ts`. You should not have to change these types or the API code, as the frontend expects this specific request and response format.

### Requirements
- Docker-Compose
- Postgres
- Node 16