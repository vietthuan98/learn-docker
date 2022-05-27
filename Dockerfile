FROM node:14-alpine

# Create app directory
WORKDIR /app

# Bundle app source
COPY . .

RUN npm install && npm run build

EXPOSE 3000

CMD npm run start

