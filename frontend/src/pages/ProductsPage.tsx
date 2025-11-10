import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

type Product = {
  _id: string;
  title: string;
  price: number;
  images: string[];
};

export default function ProductsPage() {
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    const url = new URL(import.meta.env.VITE_API_BASE_URL + '/products');
    if (q) url.searchParams.set('search', q);
    fetch(url.toString(), { signal: controller.signal })
      .then((r) => r.json())
      .then((d) => setItems(d.items ?? []))
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, [q]);

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search products..." className="border rounded px-3 py-2 w-full" />
      </div>
      {loading ? <div>Loading...</div> : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {items.map((p) => (
            <Link to={`/products/${p._id}`} key={p._id} className="border rounded p-3 hover:shadow-sm">
              <div className="aspect-video bg-gray-100 rounded mb-2" />
              <div className="font-medium truncate">{p.title}</div>
              <div className="text-blue-600">${p.price}</div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

