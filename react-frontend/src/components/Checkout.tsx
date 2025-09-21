import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { createOrder } from '../services/api';
import { OrderPayload } from '../types';

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { state, getTotalPrice, dispatch } = useCart();
  const { items } = state;
  const totals = getTotalPrice();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Le nom complet est requis';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'L\'email n\'est pas valide';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Le téléphone est requis';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const orderData: OrderPayload = {
        shopId: 's001',
        shopName: 'Bistro Parisien',
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        cart: items,
        totals,
      };

      await createOrder(orderData);
      setOrderSuccess(true);
      dispatch({ type: 'CLEAR_CART' });
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Erreur lors de la création de la commande. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0 && !orderSuccess) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Votre panier est vide</h1>
          <p className="text-gray-600 mb-8">Ajoutez des produits à votre panier avant de passer commande.</p>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Voir le catalogue
          </button>
        </div>
      </div>
    );
  }

  if (orderSuccess) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-6">
            <h2 className="text-2xl font-bold mb-2">Commande confirmée !</h2>
            <p>Votre commande a été enregistrée avec succès.</p>
          </div>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Retour au catalogue
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Finaliser la commande</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Order Summary */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Récapitulatif de la commande</h2>
          
          <div className="space-y-3 mb-6">
            {items.map((item) => (
              <div key={item.productId} className="flex justify-between items-center py-2 border-b">
                <div>
                  <span className="font-medium">{item.name}</span>
                  <span className="text-gray-500 ml-2">x{item.qty}</span>
                </div>
                <span className="font-medium">{(item.unitPrice * item.qty).toFixed(2)} €</span>
              </div>
            ))}
          </div>

          <div className="space-y-2 border-t pt-4">
            <div className="flex justify-between text-sm">
              <span>Total HT:</span>
              <span>{totals.ht.toFixed(2)} €</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>TVA (20%):</span>
              <span>{totals.vat.toFixed(2)} €</span>
            </div>
            <div className="flex justify-between text-lg font-bold">
              <span>Total TTC:</span>
              <span>{totals.ttc.toFixed(2)} €</span>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Vos coordonnées</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                Nom complet *
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.fullName ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Jean Dupont"
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="jean@example.com"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Téléphone *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.phone ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="+33 6 12 34 56 78"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-colors ${
                isSubmitting
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-green-500 hover:bg-green-600'
              }`}
            >
              {isSubmitting ? 'Envoi en cours...' : 'Envoyer ma commande'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
