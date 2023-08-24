import { GetServerSideProps, NextPage } from 'next';
import fetch from 'node-fetch';
import ErrorPage from 'next/error';
import ProductDetailPage from '../../components/ProductDetailPage';
import { Product, Review } from '../../types/types';
import { useEffect, useState } from 'react';

/**
 * 1. Client requests the `/products/[id]` page
 * 2. `getServerSideProps` is executed to fetch the props
 * 3. Return returns React `props` to the NextPage component.
 */
export const getServerSideProps: GetServerSideProps = async ({
  params,
  query,
  res,
}) => {
  try {
    const { id } = query;
    const result = await fetch(`http://localhost:3000/api/product/${id}`);
    const data = (await result.json()) as Product;

    return {
      props: {
        data,
      },
    };
  } catch (error) {
    console.log('error in pages/products/[id].tsx:30', error);
    res.statusCode = 404;
    return {
      props: {},
    };
  }
};

const ProductListingPage: NextPage<{ data: Product }> = (props) => {
  const [reviews, setReviews] = useState<Review[]>([]);

  if (!props.data) {
    return <ErrorPage statusCode={404} />;
  }

  useEffect(() => {
    fetch(`/api/review?productId=${props.data.id}`)
      .then((res) => res.json())
      .then((data) => setReviews(data.reviews as Review[]));
  }, []);

  return <ProductDetailPage product={props.data} reviews={reviews} />;
};

export default ProductListingPage;
