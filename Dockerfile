FROM node:lts-alpine

WORKDIR /app

COPY . .

RUN yarn

CMD ["node", "index.js"]