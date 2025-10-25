FROM node:18
RUN apt-get update && apt-get install openssl -y
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npx prisma generate
EXPOSE 3000
CMD ["node", "index.js"]
