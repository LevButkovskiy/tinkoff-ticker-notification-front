FROM node:latest
WORKDIR /usr/src/app
COPY package.json ./
COPY yarn.lock ./
RUN yarn install --network-timeout 100000
COPY . .
RUN yarn build
RUN npm i -g npx
CMD ["npx", "serve" "build"]