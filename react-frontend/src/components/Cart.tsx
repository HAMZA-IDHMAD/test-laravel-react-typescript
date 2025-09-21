import React from 'react';
import { useCart } from '../contexts/CartContext';
import { Link } from 'react-router-dom';

const Cart: React.FC = () => {
  const { state, dispatch, getTotalPrice } = useCart();
  const { items } = state;
  const totals = getTotalPrice();

  const handleUpdateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      dispatch({ type: 'REMOVE_ITEM', payload: productId });
    } else {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } });
    }
  };

  const handleRemoveItem = (productId: number) => {
    dispatch({ type: 'REMOVE_ITEM', payload: productId });
  };

  const handleClearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Votre panier est vide</h1>
          <p className="text-gray-600 mb-8">Découvrez nos délicieux produits !</p>
          <Link
            to="/"
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Voir le catalogue
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Votre panier</h1>
        <button
          onClick={handleClearCart}
          className="text-red-500 hover:text-red-600 font-medium"
        >
          Vider le panier
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Produit
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Prix unitaire
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantité
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sous-total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {items.map((item) => (
                <tr key={item.productId}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{item.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.unitPrice.toFixed(2)} €
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleUpdateQuantity(item.productId, item.qty - 1)}
                        className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                      >
                        -
                      </button>
                      <span className="w-8 text-center">{item.qty}</span>
                      <button
                        onClick={() => handleUpdateQuantity(item.productId, item.qty + 1)}
                        className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {(item.unitPrice * item.qty).toFixed(2)} €
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleRemoveItem(item.productId)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="bg-gray-50 px-6 py-4">
          <div className="flex justify-end">
            <div className="w-64 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Total HT:</span>
                <span>{totals.ht.toFixed(2)} €</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>TVA (20%):</span>
                <span>{totals.vat.toFixed(2)} €</span>
              </div>
              <div className="flex justify-between text-lg font-bold border-t pt-2">
                <span>Total TTC:</span>
                <span>{totals.ttc.toFixed(2)} €</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center mt-8">
        <Link
          to="/"
          className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors"
        >
          Continuer mes achats
        </Link>
        <Link
          to="/checkout"
          className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors"
        >
          Passer la commande
        </Link>
      </div>
    </div>
  );
};

export default Cart;
