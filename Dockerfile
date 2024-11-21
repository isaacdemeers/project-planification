FROM node:20-alpine
WORKDIR /app

# Copier uniquement les fichiers de configuration pour installer les dépendances
COPY package*.json ./
COPY prisma ./prisma

RUN npm install
RUN npm install prisma --save-dev


# Copier le reste des fichiers
COPY . .

RUN npx prisma generate


# Exposer le port utilisé par Next.js
EXPOSE 3000

# Démarrer le serveur en mode développement pour activer le hot reload
CMD ["npm", "run", "dev"]
