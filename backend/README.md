🚀 Installation

Cloner le projet

git clone https://github.com/<ton-user>/dashboard-platform.git
cd dashboard-platform/backend


Configurer les variables d’environnement
Un fichier .env.example est fourni. Duplique-le puis adapte les valeurs :

cp .env.example .env


Exemple minimal :

DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME=dashboard_db

JWT_SECRET=change-me-super-long-et-imprevisible
JWT_EXPIRES_IN=1h


Installer les dépendances

yarn install


Lancer PostgreSQL (via Docker si besoin)

docker run --name dashboard-db \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=dashboard_db \
  -p 5432:5432 -d postgres


Lancer l’application en mode dev

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

✅ Hashage des mots de passe avec Argon2

🚧 Authentification JWT (login / logout / refresh token)

🚧 Middleware Guard pour sécuriser les routes sensibles (ADMIN)

🗂️ Migrations

Pour gérer les évolutions du schéma de la DB :

yarn typeorm migration:generate src/migrations/Init
yarn typeorm migration:run

🧪 Tests

Lancer les tests unitaires :

yarn test
