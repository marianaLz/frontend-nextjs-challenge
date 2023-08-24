export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
};

export interface Review {
  id: string;
  productId: string;
  rating: number;
  comment: string;
  createdAt: Date;
}
