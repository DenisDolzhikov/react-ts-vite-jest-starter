FROM node:lts-alpine as build

LABEL version="1.0"
LABEL description="Production image for my pet project"

WORKDIR /app

COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]

RUN npm install

COPY . .

CMD ["npm", "run", "start"]