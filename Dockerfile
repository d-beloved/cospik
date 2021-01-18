FROM node:10.0.0
WORKDIR /app
CMD ls -ltr && yarn install && yarn start