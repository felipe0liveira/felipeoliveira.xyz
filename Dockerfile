FROM node:20.13.0-alpine

WORKDIR /usr/app

COPY package.json yarn.lock ./
RUN yarn install
RUN yarn add sharp

COPY env.yml ./env.yml

COPY . .

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]
