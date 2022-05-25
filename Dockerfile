FROM node:14

# Create app directory
WORKDIR /app

# Bundle app source
COPY . .

RUN npm install
RUN npm run build

EXPOSE 3000

ENTRYPOINT ["npm", "start"]
