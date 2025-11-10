import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

type Product = {
  _id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
};

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (!id) return;
    const controller = new AbortController();
    fetch(`${import.meta.env.VITE_API_BASE_URL}/products/${id}`, { signal: controller.signal })
      .then((r) => r.json())
      .then(setProduct)
      .catch(() => {});
    return () => controller.abort();
  }, [id]);

  if (!product) return <div>Loading...</div>;
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="aspect-video bg-gray-100 rounded" />
      <div className="space-y-3">
        <h1 className="text-2xl font-semibold">{product.title}</h1>
        <div className="text-blue-600 text-xl">${product.price}</div>
        <p className="text-gray-600">{product.description}</p>
        <button className="px-4 py-2 bg-blue-600 text-white rounded">Add to cart</button>
      </div>
    </div>
  );
}

