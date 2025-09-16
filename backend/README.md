🚀 Installation
1. Cloner le projet
git clone https://github.com/<ton-user>/dashboard-platform.git
cd dashboard-platform/backend

2. Installer les dépendances
yarn install

3. Lancer PostgreSQL (si besoin via Docker)
docker run --name dashboard-db -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=dashboard_db -p 5432:5432 -d postgres

4. Lancer l’application en mode dev
yarn start:dev


L’API sera disponible sur :
👉 http://localhost:3000
👉 Swagger UI : http://localhost:3000/api

📑 API Endpoints
Users

GET /users → liste tous les utilisateurs

GET /users/:id → récupère un utilisateur par ID

POST /users → crée un nouvel utilisateur

PATCH /users/:id → met à jour un utilisateur

DELETE /users/:id → supprime un utilisateur

⚠️ Les mots de passe sont automatiquement hashés avec Argon2 et jamais retournés dans l’API.

🔐 Sécurité (roadmap)

 Hashage des mots de passe avec Argon2

 Authentification JWT (login / logout / refresh token)

 Middleware Guard pour sécuriser les routes sensibles (ADMIN)

🗂️ Migrations

Pour gérer les évolutions du schéma de la DB :

yarn typeorm migration:generate src/migrations/Init
yarn typeorm migration:run

🧪 Tests

Lancer les tests unitaires :

yarn test

📌 Roadmap

 CRUD utilisateurs

 Swagger UI

 Hashage des mots de passe

 Auth JWT + rôles

 Dashboard frontend (Next.js + React)

 Déploiement (Docker + CI/CD)
