FROM node:14-alpine

WORKDIR /app/client

COPY package*.json ./
RUN yarn install

COPY . .

CMD ["yarn", "start"]
