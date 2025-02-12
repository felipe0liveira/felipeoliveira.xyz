FROM node:20.13.0-alpine

WORKDIR /usr/app

COPY package.json yarn.lock ./

RUN yarn install

COPY cloudrun.yaml ./cloudrun.yaml

COPY . .

# For production Image Optimization with Next.js
run yarn install sharp

RUN yarn build

ENV NODE_ENV=production

EXPOSE 3000

CMD ["yarn" "start"]
