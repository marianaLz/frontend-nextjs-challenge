import type { Product, Review } from '../types/types';

interface ProductDetailPageProps {
  product: Product;
  reviews: Review[];
}

const ProductDetailPage = (props: ProductDetailPageProps) => {
  const handleSubmitReview = (event) => {
    console.log(event);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'baseline',
          width: '100%',
          justifyContent: 'space-between',
        }}
      >
        <h1>{props.product.name}</h1>
      </div>

      <img src={props.product.image_url} />
      <p>{props.product.description}</p>
      <h3>Reviews</h3>

      {props.reviews.length > 0 ? (
        props.reviews.map((item) => (
          <div>
            {/* <p>{item.createdAt}</p> */}
            <p>{item.comment}</p>
          </div>
        ))
      ) : (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '8px',
            color: 'var(--text-light)',
            backgroundColor: 'var(--accent-bg)',
            marginBottom: '1rem',
          }}
        >
          <p>No reviews found! Be the first to leave a review.</p>
        </div>
      )}

      <hr style={{ width: '100%', marginBlockEnd: '0.5rem' }} />
      <p>Leave a review</p>

      <p>Challenge: Add review creation here</p>

      <button onClick={handleSubmitReview}>Send review</button>
    </div>
  );
};

export default ProductDetailPage;
