FROM node:10.14.2
WORKDIR /app
CMD ls -ltr && yarn install && yarn start