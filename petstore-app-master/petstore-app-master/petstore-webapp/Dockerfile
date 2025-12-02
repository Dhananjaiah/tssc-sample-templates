# Vite + Express Dev Server Dockerfile

FROM node:18-alpine

WORKDIR /app

COPY package.json vite.config.js ./
COPY src/ ./src/
# Removed COPY public/ ./public/ (public directory does not exist)
COPY index.html ./

RUN npm install

EXPOSE 5173
EXPOSE 3001

CMD ["npm", "run", "dev"]