export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  currency: string;
  image_url: string;
  category: string;
  stock: number;
}

export interface Shop {
  shopId: string;
  shopName: string;
  products: Product[];
}

export interface CartItem {
  productId: number;
  name: string;
  unitPrice: number;
  qty: number;
}

export interface OrderPayload {
  shopId: string;
  shopName: string;
  fullName: string;
  email: string;
  phone: string;
  cart: CartItem[];
  totals: {
    ht: number;
    vat: number;
    ttc: number;
  };
}

export interface OrderResponse {
  id: number;
  createdAt: string;
}
