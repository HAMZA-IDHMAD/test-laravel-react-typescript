import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Product } from '../types';
import { useCart } from '../contexts/CartContext';

interface ProductDetailProps {
  product: Product | null;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { dispatch } = useCart();
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Produit non trouvé</h1>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Retour au catalogue
          </button>
        </div>
      </div>
    );
  }

  const isOutOfStock = product.stock === 0;

  const handleAddToCart = () => {
    if (!isOutOfStock && quantity > 0) {
      dispatch({ type: 'ADD_ITEM', payload: product, quantity });
      navigate('/cart');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={() => navigate('/')}
        className="mb-6 text-blue-500 hover:text-blue-600 flex items-center"
      >
        ← Retour au catalogue
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="relative">
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-96 object-cover rounded-lg shadow-lg"
          />
          {isOutOfStock && (
            <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-2 rounded-lg text-lg font-semibold">
              Rupture de stock
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            <p className="text-lg text-gray-600 mb-4">{product.description}</p>
            <div className="flex items-center space-x-4 mb-6">
              <span className="text-3xl font-bold text-green-600">
                {product.price.toFixed(2)} {product.currency}
              </span>
              <span className="text-sm text-gray-500">
                Stock: {product.stock} unités
              </span>
            </div>
          </div>

          {/* Quantity and Add to Cart */}
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <label htmlFor="quantity" className="text-sm font-medium text-gray-700">
                Quantité:
              </label>
              <input
                id="quantity"
                type="number"
                min="1"
                max={product.stock}
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, Math.min(product.stock, parseInt(e.target.value) || 1)))}
                disabled={isOutOfStock}
                className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
              />
            </div>

            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock || quantity <= 0}
              className={`w-full py-3 px-6 rounded-lg font-semibold text-lg transition-colors ${
                isOutOfStock || quantity <= 0
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-green-500 text-white hover:bg-green-600'
              }`}
            >
              {isOutOfStock ? 'Produit en rupture de stock' : 'Ajouter au panier'}
            </button>
          </div>

          {/* Product Details */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Détails du produit</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p><span className="font-medium">Catégorie:</span> {product.category}</p>
              <p><span className="font-medium">Prix:</span> {product.price.toFixed(2)} {product.currency}</p>
              <p><span className="font-medium">Stock disponible:</span> {product.stock} unités</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
