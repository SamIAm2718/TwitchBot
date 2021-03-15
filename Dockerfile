# Build from image with node.js version 15
FROM node:15

# Create app directory
WORKDIR /usr/src/bot

# Install app dependencies
COPY ./src/package*.json ./

RUN npm install

# Bundle app source
COPY ./src/* .

EXPOSE 80

CMD [ "node", "bot.js" ]