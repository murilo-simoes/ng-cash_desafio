FROM node:alpine
WORKDIR /server
COPY package*.json ./
COPY prisma ./prisma/
COPY .env ./
COPY tsconfig.json ./
COPY . .
RUN npm install
RUN npx prisma generate
EXPOSE 3333

CMD ["npm", "run", "start"]
