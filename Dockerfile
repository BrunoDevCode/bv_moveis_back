FROM node:14-alpine

WORKDIR /usr/app
COPY package.json yarn.lock docker-compose.yml production.yml ./

RUN yarn

COPY . .

RUN yarn build

EXPOSE 3000
CMD ["yarn", "start"]