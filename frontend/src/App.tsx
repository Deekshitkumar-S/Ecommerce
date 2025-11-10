import { Route, Routes, Link, NavLink } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CheckoutPage from './pages/CheckoutPage';

export default function App() {
  return (
    <div className="min-h-full flex flex-col">
      <header className="border-b">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="font-semibold text-lg">E-Commerce</Link>
          <nav className="flex gap-4">
            <NavLink to="/products" className={({ isActive }) => isActive ? 'text-blue-600' : 'text-gray-700'}>Products</NavLink>
            <NavLink to="/cart" className={({ isActive }) => isActive ? 'text-blue-600' : 'text-gray-700'}>Cart</NavLink>
            <NavLink to="/login" className={({ isActive }) => isActive ? 'text-blue-600' : 'text-gray-700'}>Login</NavLink>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:id" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </div>
      </main>
      <footer className="border-t">
        <div className="max-w-6xl mx-auto px-4 py-6 text-sm text-gray-500">
          © {new Date().getFullYear()} E-Commerce Platform
        </div>
      </footer>
    </div>
  );
}

