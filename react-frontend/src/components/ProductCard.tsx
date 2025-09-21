import React from 'react';
import { Product } from '../types';
import { useCart } from '../contexts/CartContext';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { dispatch } = useCart();
  const isOutOfStock = product.stock === 0;

  const handleAddToCart = () => {
    if (!isOutOfStock) {
      dispatch({ type: 'ADD_ITEM', payload: product });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        {isOutOfStock && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-semibold">
            Rupture de stock
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-green-600">
            {product.price.toFixed(2)} {product.currency}
          </span>
          <div className="flex gap-2">
            <Link
              to={`/product/${product.id}`}
              className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition-colors"
            >
              Voir
            </Link>
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className={`px-3 py-1 rounded text-sm transition-colors ${
                isOutOfStock
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-green-500 text-white hover:bg-green-600'
              }`}
            >
              Ajouter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
