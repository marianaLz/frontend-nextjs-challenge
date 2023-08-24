import { useEffect, useState } from 'react';
import { NextPage } from 'next';
import type { Product } from '../../types/types';
import { GetProductsResponse } from '../api/product/index';
import Link from 'next/link';

const ProductsPage: NextPage<{ data: Product[] }> = (props) => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);

  useEffect(() => {
    fetch(`/api/product?take=10&page=${page}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setProducts(data.products);
        setTotalPages(data.pages);
      });
  }, [page]);

  const handlePrevPage = () => {
    if (page === 1) return;
    setPage(page - 1);
  };

  const handleNextPage = () => {
    if (page === totalPages) return;
    setPage(page + 1);
  };

  const handleSelected = ({ target: { value } }) => {
    setPage(value);
  };

  const pagesArray = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <h1>Products</h1>
      <p>Challenge: Display Products in a List here.</p>
      <div>
        <button disabled={page === 1} onClick={handlePrevPage}>
          Prev
        </button>
        <select onChange={handleSelected}>
          {pagesArray?.map((item) => (
            <option key={`opt-${item}`} selected={page === item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <button disabled={page === totalPages} onClick={handleNextPage}>
          Next
        </button>
      </div>

      {products?.map(({ id, name, price, description, image_url }) => (
        <Link href={`/products/${id}`} key={id}>
          <article>
            <img alt={name} src={image_url} title={name} />
            <h2>{name}</h2>
            <p>{price}</p>
            <p>{description}</p>
          </article>
        </Link>
      ))}
    </div>
  );
};

export default ProductsPage;
