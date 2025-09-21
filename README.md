# Restaurant Ordering System - React + Laravel

Un système de commande en ligne pour restaurant développé avec React TypeScript (frontend) et Laravel (backend).

## 🚀 Fonctionnalités

### Frontend (React + TypeScript)
- **Catalogue de produits** avec pagination (12 produits par page)
- **Recherche et filtrage** par nom et catégorie
- **Fiche produit détaillée** avec sélection de quantité
- **Panier d'achat** avec gestion des quantités et calculs automatiques
- **Page de commande** avec formulaire de validation
- **Interface responsive** avec Tailwind CSS
- **Gestion d'état** avec React Context API

### Backend (Laravel)
- **API REST** pour l'enregistrement des commandes
- **Base de données** avec migration et modèle Order
- **Validation** des données de commande
- **Réponses JSON** structurées

## 📁 Structure du projet

```
test-laravel-react-typescript/
├── laravel-backend/          # Backend Laravel
│   ├── app/
│   │   ├── Http/Controllers/Api/
│   │   │   └── OrderController.php
│   │   └── Models/
│   │       └── Order.php
│   ├── database/migrations/
│   │   └── 2025_09_21_133438_create_orders_table.php
│   ├── routes/
│   │   └── api.php
│   └── ...
├── react-frontend/           # Frontend React TypeScript
│   ├── public/
│   │   └── menu.json         # Données mock des produits
│   ├── src/
│   │   ├── components/       # Composants React
│   │   ├── contexts/         # Context API pour le panier
│   │   ├── services/         # Services API
│   │   ├── types/            # Types TypeScript
│   │   └── App.tsx
│   └── ...
└── menu.json                 # Fichier de données original
```

## 🛠️ Installation

### Prérequis
- PHP 8.1+ avec Composer
- Node.js 16+ avec npm
- MySQL ou SQLite
- Serveur web (Apache/Nginx) ou Laravel Sail

### Backend Laravel

1. **Naviguer vers le dossier backend**
   ```bash
   cd laravel-backend
   ```

2. **Installer les dépendances**
   ```bash
   composer install
   ```

3. **Configurer l'environnement**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

4. **Configurer la base de données**
   - Ouvrir `.env` et configurer la base de données :
   ```env
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=restaurant_orders
   DB_USERNAME=your_username
   DB_PASSWORD=your_password
   ```
   
   Ou pour SQLite (plus simple pour le test) :
   ```env
   DB_CONNECTION=sqlite
   DB_DATABASE=database/database.sqlite
   ```

5. **Exécuter les migrations**
   ```bash
   php artisan migrate
   ```

6. **Démarrer le serveur**
   ```bash
   php artisan serve
   ```
   
   Le backend sera accessible sur `http://localhost:8000`

### Frontend React

1. **Naviguer vers le dossier frontend**
   ```bash
   cd react-frontend
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Configurer l'URL de l'API** (optionnel)
   - Créer un fichier `.env` dans `react-frontend/` :
   ```env
   REACT_APP_API_URL=http://localhost:8000/api
   ```

4. **Démarrer le serveur de développement**
   ```bash
   npm start
   ```
   
   Le frontend sera accessible sur `http://localhost:3000`

## 🔧 Configuration

### Variables d'environnement

#### Backend (.env)
```env
APP_NAME="Restaurant Ordering System"
APP_ENV=local
APP_KEY=base64:...
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=sqlite
DB_DATABASE=database/database.sqlite

CORS_ALLOWED_ORIGINS=http://localhost:3000
```

#### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:8000/api
```

## 📊 API Endpoints

### POST /api/orders
Crée une nouvelle commande.

**Payload :**
```json
{
  "shopId": "s001",
  "shopName": "Bistro Parisien",
  "fullName": "Jean Dupont",
  "email": "jean@example.com",
  "phone": "+33 6 12 34 56 78",
  "cart": [
    {
      "productId": 101,
      "name": "Menu Burger Classique",
      "unitPrice": 12.9,
      "qty": 2
    }
  ],
  "totals": {
    "ht": 25.8,
    "vat": 5.16,
    "ttc": 30.96
  }
}
```

**Réponse :**
```json
{
  "id": 1,
  "createdAt": "2025-09-21T13:34:38.000000Z"
}
```

## 🎨 Technologies utilisées

### Frontend
- **React 18** avec TypeScript
- **React Router** pour la navigation
- **Tailwind CSS** pour le styling
- **Axios** pour les appels API
- **Context API** pour la gestion d'état

### Backend
- **Laravel 12** (dernière version)
- **MySQL/SQLite** pour la base de données
- **Eloquent ORM** pour les modèles
- **API Resources** pour les réponses JSON

## 🚀 Utilisation

1. **Accéder au catalogue** : `http://localhost:3000`
2. **Parcourir les produits** avec pagination et filtres
3. **Voir les détails** d'un produit en cliquant sur "Voir"
4. **Ajouter au panier** depuis le catalogue ou la fiche produit
5. **Gérer le panier** : modifier les quantités, supprimer des articles
6. **Passer commande** : remplir le formulaire de contact
7. **Confirmation** : la commande est enregistrée en base de données

## 📝 Structure des données

### Produits (menu.json)
```json
{
  "shopId": "s001",
  "shopName": "Bistro Parisien",
  "products": [
    {
      "id": 101,
      "name": "Menu Burger Classique",
      "description": "Bœuf, cheddar, frites maison",
      "price": 12.9,
      "currency": "EUR",
      "image_url": "https://placehold.co/600x400?text=Menu",
      "category": "plats",
      "stock": 25
    }
  ]
}
```

### Commande (Base de données)
- `id` : Identifiant unique
- `shopId` : ID du restaurant
- `shopName` : Nom du restaurant
- `fullName` : Nom complet du client
- `email` : Email du client
- `phone` : Téléphone du client
- `cart_json` : Panier en JSON
- `ht` : Total HT
- `vat` : TVA (20%)
- `ttc` : Total TTC
- `created_at` : Date de création

## 🧪 Tests

### Backend
```bash
cd laravel-backend
php artisan test
```

### Frontend
```bash
cd react-frontend
npm test
```

## 📦 Build de production

### Frontend
```bash
cd react-frontend
npm run build
```

### Backend
```bash
cd laravel-backend
composer install --optimize-autoloader --no-dev
php artisan config:cache
php artisan route:cache
```

## 🔍 Fonctionnalités implémentées

✅ **Catalogue de produits** avec pagination (12 par page)  
✅ **Recherche par nom** et filtrage par catégorie  
✅ **Fiche produit détaillée** avec sélection de quantité  
✅ **Panier d'achat** avec gestion des quantités  
✅ **Calculs automatiques** (HT, TVA 20%, TTC)  
✅ **Page de commande** avec validation de formulaire  
✅ **API Laravel** pour l'enregistrement des commandes  
✅ **Interface responsive** avec Tailwind CSS  
✅ **Typage TypeScript** strict  
✅ **Gestion d'état** avec Context API  

## 🐛 Dépannage

### Problèmes courants

1. **CORS Error** : Vérifier que le backend accepte les requêtes du frontend
2. **Base de données** : S'assurer que les migrations sont exécutées
3. **Ports** : Vérifier que les ports 3000 et 8000 sont libres
4. **Dépendances** : Exécuter `composer install` et `npm install`

### Logs
- **Laravel** : `storage/logs/laravel.log`
- **React** : Console du navigateur

## 📄 Licence

Ce projet est développé dans le cadre d'un test technique.

## 👨‍💻 Auteur

Développé avec ❤️ pour le test technique React + Laravel.
